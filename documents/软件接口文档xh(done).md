# 软件接口文档

[TOC]

## 介绍

本文档描述了 FocusToDo 微信小程序的各个页面模块的接口信息，包括专注页面、待办事项、数据统计、个人中心和AI助手。

## 术语和缩写

- **API**: Application Programming Interface
- **UI**: User Interface
- **GUI**: Graphical User Interface
- **HTTP**: Hypertext Transfer Protocol
- **JSON**: JavaScript Object Notation

## 整体架构

​	FocusToDo 微信小程序采用前端-后端架构，前端使用JavaScript 编写逻辑，WXML 定义结构，WXSS 实现样式，后端利用微信云开发提供的云函数处理后端逻辑，确保数据处理的安全性和可靠性。

## 接口列表

### 专注页面接口

#### 开始专注计时

- **接口名称**: startTimer
- **描述**: 启动专注计时器，开始工作时间倒计时。
- **调用方式**: HTTP POST
- **URL**: `/pages/index/index.js/startTimer`
- **输入参数**:
  - `duration`: 工作时间长度 (分钟)
- **输出结果**:
  - `data.isRunning`: 是否成功启动计时 (true/false)

#### 结束专注计时

- **接口名称**: endTimer
- **描述**: 结束当前的工作时间段，进入休息模式。
- **调用方式**: HTTP POST
- **URL**: `/pages/index/index.js/startTimer`
- **输出结果**:
  - `data.isRunning`: 是否成功结束计时 (true/false)

### 待办事项接口

#### 获取待办事项列表

- **接口名称**: onLoad
- **描述**: 获取用户的待办事项列表。
- **调用方式**: HTTP GET
- **URL**: ` /pages/index/index.js/onLoad`
- **输出结果**:
  - `todos`: 待办事项列表 (JSON 数组)

#### 添加新的待办事项

- **接口名称**: addTodoHandle
- **描述**: 添加新的待办事项到用户的列表中。
- **调用方式**: HTTP POST
- **URL**: `/pages/todos/todo.js/addTodoHandle`
- **输入参数**:
  - `title`: 待办事项标题 (字符串)
- **输出结果**:
  - `success`: 是否成功添加待办事项 (true/false)

#### 保存待办事项

- **接口名称**: Save
- **描述**: 保存新的待办事项到用户的列表中。
- **调用方式**: HTTP POST
- **URL**: `/pages/todos/todo.js/save

### 数据统计接口

#### 获取工作统计数据

- **接口名称**: getLogs
- **描述**: 获取用户的工作统计数据，包括工作时长、任务完成数量等。
- **调用方式**: HTTP GET
- **URL**: `/pages/logs/logs.js/getLogs`
- **输出结果**:
  - `workHours`: 工作时长 (分钟)
  - `tasksCompleted`: 完成的任务数量

### 个人中心接口

#### 获取个人信息

- **接口名称**: getUserProfile
- **描述**: 获取用户的个人信息。
- **调用方式**: HTTP GET
- **URL**: `/pages/setting/setting.js/getUserProfile`
- **输出结果**:
  - `name`: 用户名
  - `avatarUrl`: 头像 URL

### AI助手接口

#### 调用AI助手

- **接口名称**: aiGetup
- **描述**: 调用AI助手接口，使用GPT模型提供智能建议。
- **调用方式**: HTTP POST
- **URL**: `/pages/todos/todos.js/aiGetup`
- **输入参数**:
  - `query`: 用户问题或需求 (字符串)
- **输出结果**:
  - `response`: AI助手的智能回复 (字符串)
- 发送请求到服务器，调用GPT的接口
  - /pages/chat/chat.js/sendRequest

## 示例和用法

### 开始专注计时

```http
POST /pages/index/index.js/startTimer
Content-Type: application/json

{
  "duration": 25
}
```

### 获取待办事项列表示例

```http
GET /pages/index/index.js/onLoad
```

## 错误处理

服务器端会返回合适的 HTTP 状态码和错误信息，例如 404 Not Found 表示接口不存在，500 Internal Server Error 表示服务器内部错误等。

## 安全性和权限

所有接口都需要合法的用户身份验证，使用 Token 或其他安全机制保护接口的访问权限。

## 附录

- 数据格式：接口返回数据为 JSON 格式
- 标准参考：遵循微信小程序 API 设计规范