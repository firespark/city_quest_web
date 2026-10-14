
type HttpResponse<T = unknown> = {
  success: number
  data?: T
  error?: string
}

export class Http {
  static async get<T = unknown>(url: string, token = ''): Promise<HttpResponse<T>> {
    return await request<T>(url, token, 'GET', {}, 3, 1000)
  }

  static async post<T = unknown>(url: string, data: unknown, token = ''): Promise<HttpResponse<T>> {
    const response = await request<T>(url, token, 'POST', data, 0, 1000)

    if (response.error === 'connection_error') {
      response.error = 'Отсутствует подключение к интернету. Проверьте сеть и попробуйте снова.'
    }

    return response
  }
}

async function request<T = unknown>(
  url: string,
  token = '',
  method: 'GET' | 'POST' = 'GET',
  data: unknown = {},
  retries = 3,
  delay = 1000
): Promise<HttpResponse<T>> {
  let headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }

  if (token !== '') {
    headers['Authorization'] = `Bearer ${token}`
  }

  const config: RequestInit = {
    method,
    headers: headers
  }

  if (method === 'POST') {
    config.body = JSON.stringify(data)
  }

  try {
    const response = await fetch(url, config)

    if (!response.ok) {
      throw new Error(`HTTP status: ${response.status}`)
    }

    return await response.json() as HttpResponse<T>

  } catch (e) {

    if (retries > 0) {

      await new Promise(resolve => setTimeout(resolve, delay))

      return request<T>(url, token, method, data, retries - 1, delay * 2)
    }

    console.log(`Сетевая ошибка для ${url}:`, e)

    return {
      success: 0,
      error: 'connection_error'
    }
  }
}
