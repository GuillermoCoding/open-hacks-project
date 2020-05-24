import os, sys
from flask import Flask, request
from pymessenger import Bot
from utils import wit_response

app=Flask(__name__)

access_token="EAAJRaGFcQwoBABrey4Yqj8erDa5UwKSWeN9R5m0lPxOZAa8ByhD4rdh7D07qFoKn1qhGGmQ3sgvLZA76SyKW1evaBPpDOMqlhWbZAiJnQTej9QZClQNgRZBvlv6zSS0EvaXgyk3RGX2ZCrDt8Fur5x9TQjv6aJskRAGC04DFlKhwZDZD"
bot=Bot(access_token)

@app.route('/',methods=['GET'])
def verify():
    if request.args.get("hub.mode")=='subscribe' and request.args.get('hub.challenge'):
        if not request.args.get('hub.verify_token')=='hello':
            return "Verification token mismatch", 403
        return request.args['hub.challenge'],200
    return "Hello world", 200

@app.route('/',methods=['POST'])
def webhook():
    data=request.get_json()
    log(data)

    if data['object']=='page':
        for entry in data['entry']:
            for messaging_event in entry['messaging']:
                recipient_id=messaging_event['recipient']['id']
                sender_id=messaging_event['sender']['id']

                if messaging_event.get('message'):
                    if 'text' in messaging_event['message']:
                        messaging_text=messaging_event['message']['text']
                    else:
                        messaging_text='no text'

                    response=None

                    intention,entity,value=wit_response(messaging_text)

                    if intention=='greetings':
                        if entity=='greetings':
                            response="Hello! I'm Torch, nice to meet you"
                        elif entity=='bye':
                            response=="Anything else I can help you with?"
                        elif entity=="thanks":
                            response="You're welcome! Anything else I can help you with?"
                        else:
                            response="I didn't get that. Could you rephrase, please?"
                    else:
                        if entity=='location':
                            response="Ok. I will connect you with peers and mentors in {} area".format(value)
                        elif entity=='domain_interest':
                            response="Ok. I will connect you with peers and mentors in {} ".format(value)
                        elif entity=='mentor_chat':
                            response="Ok. I will connect you with a mentor"
                    if response is None:
                        response="I didn't get that. Please rephrase"

                    bot.send_text_message(sender_id,response)

    return "ok", 200

def log(message):
    print(message)
    sys.stdout.flush()

if __name__=="__main__":
    app.run(debug=True,port=80)
