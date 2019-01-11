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
    let user = req.body.events[0].userId
    let smsg = 'Welcome, Can I help you'
    push(smsg)
    push(user)
    res.send(user)
})

// replying
app.post('/webhook', (req, res) => {

    let reply_token = req.body.events[0].replyToken     // cannot change event
    let msg = req.body.events[0].message.text
    let user = req.body.events[0].userId
    reply(reply_token,msg)    
    res.sendStatus(200)
})

app.listen(port)    // makes your server be able to accept a parameter from the environment that port to listen on, depending on your requirement and the requirement of the environment

function push(){
    let body = JSON.stringify({
        to: user,
    messages: [{
        type: 'template',
        altText: 'this is a buttons template',
        template: {
          type: 'buttons',
          actions: [
            {
              type: 'postback',
              label: 'More Info',
              text: 'Add',
              data: 'input'
            }
          ],
          thumbnailImageUrl: 'https://i.postimg.cc/vmZPD22P/PC270430.jpg',
          title: 'My namne is tube',
          text: 'My Information'
        }
      }]   
  })
  console.log('pass')
  if(body.messages.template.data == 'input'){
      //send()
      console.log('Sent')
  }
  curl('push', body)
}

function reply(reply_token, msg) {
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'flex',
            altText: 'Flex Message',
            contents: {
              type: 'bubble',
              header: {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'text',
                    text: 'Sanam Chandra Palace ',
                    size: 'xs',
                    weight: 'bold',
                    color: '#AAAAAA'
                  }
                ]
              },
              hero: {
                type: 'image',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Chali_Mongkol_Asana.jpg/1200px-Chali_Mongkol_Asana.jpg',
                flex: 3,
                align: 'start',
                size: 'full',
                aspectRatio: '20:13',
                aspectMode: 'cover',
                action: {
                  type: 'uri',
                  label: 'Action',
                  uri: 'https://linecorp.com/'
                }
              },
              body: {
                type: 'box',
                layout: 'horizontal',
                spacing: 'md',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    flex: 1,
                    contents: [
                      {
                        type: 'image',
                        url: 'https://static.bhphotovideo.com/explora/sites/default/files/styles/top_shot/public/Color-Temperature.jpg?itok=yHYqoXAf',
                        gravity: 'bottom',
                        size: 'sm',
                        aspectRatio: '4:3',
                        aspectMode: 'cover'
                      },
                      {
                        type: 'image',
                        url: 'https://www.clipartmax.com/png/middle/251-2517394_backpacking-package-tour-tourism-cartoon-tourist-cartoon-png.png',
                        margin: 'md',
                        size: 'sm',
                        aspectRatio: '4:3',
                        aspectMode: 'cover'
                      }
                    ]
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    flex: 2,
                    contents: [
                      {
                        type: 'text',
                        text: 'Temperature : ',
                        flex: 1,
                        size: 'xs',
                        gravity: 'top',
                        weight: 'bold'
                      },
                      {
                        type: 'separator',
                        color: '#2ABA11'
                      },
                      {
                        type: 'text',
                        text: 'Humidity     :',
                        flex: 2,
                        size: 'xs',
                        gravity: 'center',
                        weight: 'bold'
                      },
                      {
                        type: 'separator',
                        color: '#54BC0A'
                      },
                      {
                        type: 'text',
                        text: 'P In      :',
                        flex: 2,
                        size: 'xs',
                        gravity: 'center',
                        weight: 'bold',
                        color: '#141813'
                      },
                      {
                        type: 'separator',
                        color: '#06BC0B'
                      },
                      {
                        type: 'text',
                        text: 'P Out    :',
                        flex: 1,
                        size: 'xs',
                        gravity: 'bottom',
                        weight: 'bold'
                      }
                    ]
                  }
                ]
              }
            }
          }
        
        
        ]
            
            /*{               // answer normally
                 type: 'text',
                 text: 'Can I help you'
            },
            {
                type: 'sticker',
                packageId: '11539',
                stickerId: '52114115'
            }
*/
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
