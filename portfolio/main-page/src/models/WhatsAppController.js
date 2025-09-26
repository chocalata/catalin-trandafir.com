/**
 * This is the class that will handle the WhatsApp API
 */
const { Client, LocalAuth } = require('whatsapp-web.js')
const QRCode = require('qrcode')
const path = require('path')
const fs = require('fs')

const messagesToSendFilePath = path.join(
  __dirname,
  '../whatsapp-data/messagesToSend.txt'
)

const WHATSAPP_CHAT_WEB_CONTACT = process.env.WHATSAPP_CHAT_WEB_CONTACT

class WhatsAppController {
  #client
  #log
  #clientIsReady = false
  constructor(log) {
    const client = new Client({
      puppeteer: {
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-extensions'
        ],
        headless: true
      },
      authStrategy: new LocalAuth({
        dataPath: path.join(__dirname, '../whatsapp-data/')
      }),
      webVersionCache: {
        type: 'local',
        path: path.join(__dirname, '../whatsapp-data/cache/')
      }
    })

    client.initialize()

    client.on('qr', (qr) => {
      log.info(`QR RECEIVED: ${qr}`)
      QRCode.toString(qr, { type: 'terminal' }, function (err, url) {
        console.log(url)
      })
    })

    client.on('ready', () => {
      log.info('CLIENT IS READY!')
      this.#clientIsReady = true

      this.sendMessage('Whatsapp client ready!')

      this.sendRemainingMessages()
    })

    this.#client = client
    this.#log = log
  }

  sendMessage(message) {
    if (!this.#clientIsReady) {
      this.#log.error('Client is not ready yet!')
      return false
    }
    this.#client.getChatById(WHATSAPP_CHAT_WEB_CONTACT).then((chat) => {
      chat.sendMessage(message).then((msg) => {
        this.#log.info(`Message sent: ${msg.body}`)
      })
    })
  }

  getMessagesToSendFilePath() {
    return messagesToSendFilePath
  }

  getMessagesToSend() {
    try {
      const data = fs.readFileSync(messagesToSendFilePath, 'utf-8')
      return data
        .split('\n||||||||||||||||||||||||||||||||||||||||||||||')
        .filter((msg) => msg.trim() !== '')
    } catch (err) {
      this.#log.error('Error reading messagesToSend.txt:', err)
      return []
    }
  }

  clearMessagesToSend() {
    try {
      fs.writeFileSync(messagesToSendFilePath, '')
      this.#log.info('messagesToSend.txt cleared successfully.')
      return true
    } catch (err) {
      this.#log.error('Error clearing messagesToSend.txt:', err)
      return false
    }
  }

  sendRemainingMessages() {
    const messages = this.getMessagesToSend()
    messages.forEach((message) => {
      this.sendMessage(message)
    })
    this.clearMessagesToSend()
  }

  isClientReady() {
    return this.#clientIsReady
  }
}

module.exports = WhatsAppController
