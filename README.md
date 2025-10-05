# Discord-GetRole

Discordのロールを付与/剥奪することのできるBotです。

# 利用にあたって

当Botを利用するためには、**node.js**が必須になります。
[Discorddeveloperポータル](https://discord.com/developers/)で**管理権限**(推奨)のあるアプリを作成し、自分のサーバーに導入してください。<br>
Botトークンが必要となります。<br>
このBotトークンは一度しか表示されませんが、再生成ができます。

config.jsonを開いて以下の設定をします。
```json
{
    "token": "BotTOKENに置き換えてね", 
    "channel": "ドロップダウンを送信するチャンネルID", 
    "mapping": {
        "表示するロール名":"ロールID"
    }
}
```
`token`にBotのトークンを置き換えてください。
`channel`にドロップダウンを送信するチャンネルIDに置き換えてください。
`maping`のオブジェクトに以下の形でロール名とロールIDを置き換えてください。
```
{
   "テスト":"12345678915"
}
```

