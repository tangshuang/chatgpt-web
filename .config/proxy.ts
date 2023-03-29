import type { ProxyOptions } from 'vite'

export function createViteProxy(isOpenProxy: boolean, viteEnv: ImportMetaEnv) {
  if (!isOpenProxy)
    return

  const proxy: Record<string, string | ProxyOptions> = {}

  if (viteEnv.VITE_APP_API_BASE_URL) {
    proxy['/api'] = {
      target: viteEnv.VITE_APP_API_BASE_URL,
      changeOrigin: true,
      rewrite: path => path.replace('/api/', '/'),
      configure(proxy) {
        if (viteEnv.VITE_APP_API_TOKEN) {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.setHeader('EGW-TOKEN', viteEnv.VITE_APP_API_TOKEN)
          })
        }
      },
    }
  }

  return proxy
}
