[公式の backlog-mcp-server](https://github.com/nulab/backlog-mcp-server/blob/main/README.ja.md)がリリースされましたのでそちらをご利用ください。

---

## Requirements

- Nodejs 20 以上, NPM 10 以上

## 機能

- [x] [課題情報の取得](https://developer.nulab.com/ja/docs/backlog/api/2/get-issue/)
- [x] [課題コメントの取得](https://developer.nulab.com/ja/docs/backlog/api/2/get-comment-list/)
- [x] [課題添付ファイルのダウンロード](https://developer.nulab.com/ja/docs/backlog/api/2/get-issue-attachment/)
- [x] [課題添付ファイル一覧の取得](https://developer.nulab.com/ja/docs/backlog/api/2/get-list-of-issue-attachments/)
- [x] [課題共有ファイル一覧の取得](https://developer.nulab.com/ja/docs/backlog/api/2/get-list-of-linked-shared-files/)

## Install

- VSCode > CLINE > MCP Servers 設定画面 > Configure MCP Servers
  <img width="1064" alt="Screenshot 2025-04-18 at 11 56 28" src="https://github.com/user-attachments/assets/783b72a0-ba0f-4769-8222-d5754d48573d" />

- 下記のように backlog-mcp-server の設定を追加します。
  - BACKLOG_API_TOKEN は、https://your-space-here.backlog.jp/EditApiSettings.action
  - BACKLOG_SPACE は、 https://your-space-here.backlog.jp ならば、your-space-here です

```jsonc
{
  "mcpServers": {
    "backlog": {
      "autoApprove": [
        "get_issue",
        "get_issue_comments",
        "get_issue_attachments",
        "get_issue_attachment",
        "get_issue_shared_files",
        "get_issue_types"
      ],
      "disabled": false,
      "timeout": 60,
      "command": "npx",
      "args": ["-y", "https://github.com/pj8/backlog-mcp-server"],
      "env": {
        "BACKLOG_API_TOKEN": "****",
        "BACKLOG_SPACE": "your-space-here"
      },
      "transportType": "stdio"
    }
  }
}
```

## 使い方

- CLINE に Backlog 課題 URL を与えて概要を説明させるなど
