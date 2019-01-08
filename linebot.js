const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()
const port = process.env.PORT || 4000   // whatever is in the environment variable PORT or 3000 if there's nothing there.
const Headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer {leSLT6TM73BCkORSMedsDEI0MfrS29lfV6wIIsXbF6UmJ5Y2d+Y80RAlxtIkfFuPhJOL5+8lx4Wyv6ojj1Eibr04O1n3fORRGHwUnIyM8tfV//liRGkp73cDYiCTN/ZTkd42KICBYRCWO4ctm02u/wdB04t89/1O/w1cDnyilFU=}'
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// pushing
app.get('/webhook', (req, res) => {
    let smsg = 'Welcome, Can I help you'
    push(smsg)
    res.send(smsg)
})

// replying
app.post('/webhook', (req, res) => {

    let reply_token = req.body.events[0].replyToken     // cannot change event
    let msg = req.body.events[0].message.text
    reply(reply_token,msg)    
    res.sendStatus(200)
})

app.listen(port)    // makes your server be able to accept a parameter from the environment that port to listen on, depending on your requirement and the requirement of the environment

function push(smsg){
    let body = JSON.stringify({
        to: 'U2cce7962a9ba284308540b3b28ffa885',
    messages: [{
        type: 'text',
        text: smsg
    }]   
    
  })
  curl('push', body)
}


function reply(reply_token, msg) {
    if(msg == 'hi'){
    
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{                // answer normally
                 type: 'text',
                 text: 'Your word'
            },
            {
                type: 'text',
                text: msg
            }]
        
    

        /*
        messages: [{
            type: 'text',           // echo message
            text: msg
        }]*/

        /*
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
        }]*/
          

    })
}
    curl('reply', body)
}

function curl(method, body){
    request.post({
        url: 'https://api.line.me/v2/bot/message/' + method,
        headers: Headers,
        body: body
    }, (err, res, body) => {

        console.log('status = ' + res.statusCode);
    });
}
