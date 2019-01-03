// initial return hello

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/webhook', (req, res) => {

    let reply_token = req.body.events[0].replyToken
    let msg = req.body.events[0].message.text
    //reply(reply_token)  
    reply(reply_token, msg)  
    res.sendStatus(200)
})

app.listen(port)

function reply(reply_token, msg) {
//function reply(reply_token) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {leSLT6TM73BCkORSMedsDEI0MfrS29lfV6wIIsXbF6UmJ5Y2d+Y80RAlxtIkfFuPhJOL5+8lx4Wyv6ojj1Eibr04O1n3fORRGHwUnIyM8tfV//liRGkp73cDYiCTN/ZTkd42KICBYRCWO4ctm02u/wdB04t89/1O/w1cDnyilFU=}'
    }
    
    let body = JSON.stringify({
        replyToken: reply_token,
        /*
        messages: [{
            type: 'text',
            text: 'Hi Aoff who is the most beautiful girl'
        },
        {
            type: 'text',
            text: 'How can I help you?'
        }]*/

        /*
        messages: [{
            type: 'text',
            text: msg
        }]*/

        messages: [{

            type: 'template',
            altText: 'this is a carousel template',
            template: {
                type: 'carousel',
                columns: [
                    {
                      thumbnailImageUrl: 'https://www.mcchrystalgroup.com/wp-content/uploads/2017/05/day1.png',
                      imageBackgroundColor: '#FFFFE0',
                      title: 'Day1',
                      text: 'Information',
                      defaultAction: {
                          type: 'uri',
                          label: 'View detail',
                          uri: 'https://weather.com/weather/today/l/13.75,100.49?par=google'
                      },
                      actions: [
                          {
                              type: 'postback',
                              label: 'Pressure',
                              data: 'action=pressure&itemid=111'
                          },
                          {
                              type: 'postback',
                              label: 'Temperature',
                              data: 'action=temp&itemid=111'
                          },
                          {
                              type: 'uri',
                              label: 'View more detail',
                              uri: 'https://weather.com/weather/today/l/13.75,100.49?par=google'
                          }
                      ]
                    },
                    {
                      thumbnailImageUrl: 'https://carlosvargas.com/wp-content/uploads/2014/01/day2-1-1.jpg',
                      imageBackgroundColor: '#000000',
                      title: 'Day2',
                      text: 'Information',
                      defaultAction: {
                          type: 'uri',
                          label: 'View detail',
                          uri: 'https://weather.com/weather/today/l/13.75,100.49?par=google'
                      },
                      actions: [
                          {
                              type: 'postback',
                              label: 'Humidity',
                              data: 'action=humid&itemid=222'
                          },
                          {
                              type: 'postback',
                              label: 'Accelerometer',
                              data: 'action=acc&itemid=222'
                          },
                          {
                              type: 'uri',
                              label: 'View detail',
                              uri: 'http://example.com/page/222'
                          }
                      ]
                    }
                ],
                imageAspectRatio: 'rectangle',
                imageSize: 'cover'
            }
        }]  
    })

    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {

        console.log('status = ' + res.statusCode);
    });
}