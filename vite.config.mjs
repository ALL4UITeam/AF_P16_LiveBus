import glob from 'fast-glob'
import fs from 'fs'
import path from 'path'
import esbuild from 'esbuild'
import { defineConfig, loadEnv } from 'vite'
import handlebars from 'vite-plugin-handlebars'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const projectName = 'vite-full-template'

  const basePath = './'

  const pagesPath = path.resolve(__dirname, 'src')
  const pageFiles = fs.readdirSync(pagesPath)
    .filter(file => file.endsWith('.html') && file !== 'link-page.html')

  const pageMetaList = pageFiles.map(file => {
    const filePath = path.join(pagesPath, file)
    const content = fs.readFileSync(filePath, 'utf-8')
    const lines = content.split('\n').slice(0, 10)
    const meta = {}
    lines.forEach(line => {
      const match = line.match(/@(\w+)\s+(.+?)\s*-->/)
      if (match) {
        const [, key, value] = match
        meta[key] = value.trim()
      }
    })
    return {
      name: file,
      title: meta.pageTitle || path.basename(file, '.html'),
      note: meta.pageNote || '',
      created: meta.pageCreated || '',
      updated: meta.pageUpdated || ''
    }
  })

  return {
    root: 'src',
    base: basePath,
    publicDir: '../public',
    build: {
      outDir: '../dist',
      emptyOutDir: true,
      assetsInlineLimit: 0,
      cssCodeSplit: true,
      minify: false,
      modulePreload: false,
      rollupOptions: {
        input: Object.fromEntries(
          glob.sync('src/*.html').map(file => {
            const name = path.basename(file, '.html')
            return [name, path.resolve(__dirname, file)]
          })
        ),
        output: {
          entryFileNames: 'assets/js/[name].js',
          chunkFileNames: 'assets/js/[name].js',
          assetFileNames: ({ name }) => {
            if (/\.(css)$/.test(name ?? '')) {
              return 'assets/css/[name][extname]'
            }
            if (/\.(png|jpe?g|gif|svg|webp)$/.test(name ?? '')) {
              return 'assets/images/[name][extname]'
            }
            return 'assets/[name][extname]'
          }
        }
      }
    },
    esbuild: {
      minify: false
    },
    css: {
      postcss: {
        plugins: []
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    plugins: [
      handlebars({
        partialDirectory: path.resolve(__dirname, 'src/components'),
        context: {
          pages: pageMetaList
        }
      }),
      {
        name: 'no-css-minify',
        generateBundle(_, bundle) {
          for (const fileName in bundle) {
            if (fileName.endsWith('.css')) {
              const chunk = bundle[fileName]
              if ('code' in chunk) {
                chunk.code = chunk.code.replace(/}/g, '}\n')
              }
            }
          }
        }
      },
      {
        name: 'cleanup-html',
        closeBundle() {
          const distPath = path.resolve(__dirname, 'dist')
          const htmlFiles = fs.readdirSync(distPath).filter(f => f.endsWith('.html'))
          const appScript = '<script defer src="./assets/js/app.js"></script>'

          htmlFiles.forEach(file => {
            const filePath = path.join(distPath, file)
            let content = fs.readFileSync(filePath, 'utf-8')
            content = content.replace(/ crossorigin/g, '')
            content = content.replace(/<link rel="modulepreload" [^>]+?>/g, '')
            content = content.replace(/<script type="module"\s+src="\.\/assets\/js\/[^"]+\.js"><\/script>/g, '')

            if (!content.includes('./assets/js/app.js')) {
              content = content.replace(
                /(<script src="\.\/lib\/dragula\/dragula\.min\.js"><\/script>)/,
                `$1\n\t${appScript}`
              )
            }

            fs.writeFileSync(filePath, content)
          })

          console.log('✅ 빌드 후 module → defer IIFE script 변환 완료')
        }
      },
      {
        name: 'build-iife-bundle',
        async closeBundle() {
          const distJsDir = path.resolve(__dirname, 'dist/assets/js')
          const appPath = path.join(distJsDir, 'app.js')

          await esbuild.build({
            entryPoints: [path.resolve(__dirname, 'src/js/page/index.js')],
            outfile: appPath,
            bundle: true,
            format: 'iife',
            globalName: 'Livebus',
            alias: {
              '@': path.resolve(__dirname, 'src')
            }
          })

          for (const file of fs.readdirSync(distJsDir)) {
            if (file !== 'app.js' && file.endsWith('.js')) {
              fs.unlinkSync(path.join(distJsDir, file))
            }
          }

          console.log('✅ IIFE 번들 생성 완료: assets/js/app.js')
        }
      }
    ]
  }
})
