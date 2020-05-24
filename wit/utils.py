from wit import Wit

token="RH3W2SQS76CD4VFCDLKUHVOEFR4IXFL5"

client=Wit(access_token=token)

def wit_response(message_text):
    resp=client.message(message_text)
    intent=None
    entity=None
    value=None

    try:
        i=list(resp['entities'])[0]
        if i in ['greetings','thanks','bye']:
            intent='greetings'
            entity=list(resp['entities'])[0]
            value=resp['entities'][entity][0]['value']
        else:
            intent=resp['entities'][i][0]['value']
            entity=list(resp['entities'])[1]
            value=resp['entities'][entity][0]['value']
    except:
        pass
    return (intent,entity,value)
