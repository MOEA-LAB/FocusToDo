import http.server
import requests
import json

class MyHandler(http.server.BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        
        # 解析请求的数据
        data = json.loads(post_data.decode('utf-8'))

        # 指定 API 的 URL 和头部信息
        url = "https://apikeyplus.com/v1/chat/completions"
        headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer sk-V5AUUyqLFK7nfbOj549d604250804a7cBdB4E44c4d2c8298'
        }

        # 发送请求到 API
        response = requests.post(url, headers=headers, json=data)
        
        # 获取 API 的响应数据
        response_data = response.json()

        # 设置 HTTP 响应头
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

        # 返回 API 响应数据
        self.wfile.write(json.dumps(response_data).encode('utf-8'))

def run(server_class=http.server.HTTPServer, handler_class=MyHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print('Starting http server...')
    httpd.serve_forever()

if __name__ == '__main__':
    run()
