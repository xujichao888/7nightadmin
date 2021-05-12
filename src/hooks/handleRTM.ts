import AgoraRTM from 'agora-rtm-sdk';
import { handleStores } from '@/hooks/handleStore'
import { http_getRTMtoken } from '@/assets/request/api';
import { message } from 'ant-design-vue';
let appid = "399ee83692d54e65bcf0ea30f70f132e";
let client: any = null;

interface IsubscribeClientEvents {
    ConnectionStateChangedEvent: () => void
    MessageFromPeer: () => void
}
interface Iuserinfo {
    userid: string;
    userInfo:Isendmsg;
    message:Imessage

}
interface Isendmsg {
    userid: string;
    nickname:string;
    avatar:string;
    sex:number;
}
interface Imessage{
    type:number;
    date:number;
    msg:string;
    id:number;
    isSelf:boolean;
}

enum connectionState {
    DISCONNECTED = 'DISCONNECTED',//用户未连接
    CONNECTING = 'CONNECTING',//用户正在连接
    CONNECTED = 'CONNECTED',//用户已连接
    RECONNECTING = 'RECONNECTING',//用户正在重连
    ABORTED = 'ABORTED',//用户被踢出
}

function initRTM(): void {
    let { saveRTMclient } = handleStores()
    let { ConnectionStateChangedEvent, MessageFromPeer } = subscribeClientEvents()
    client = AgoraRTM.createInstance(appid);
    //将client设置到vuex中
    saveRTMclient(client)
    //监听连接状态
    ConnectionStateChangedEvent()
    //监听接收消息
    MessageFromPeer()
}

export async function loginRTM(uid: string): Promise<void> { //登录声网
    console.log(uid)
    initRTM();
    let result = await http_getRTMtoken();
    if (result.code == 0) {
        let { data: token } = result
        client.login({ uid, token })
    } else {
        message.error('获取RTMtoken失败')
    }
}
export function logoutRTM(): void {
    client.logout()
}
export async function sendTextMsg(uid: string, obj: Iuserinfo): Promise<any> {
    console.log(uid)
    try {
        let result = await client.sendMessageToPeer(
            { text: JSON.stringify(obj) },
            uid,
            { enableHistoricalMessaging: true, enableOfflineMessaging: true }
        )
        if (result.hasPeerReceived) {
            console.log('发送成功')
            return result
        } else {
            console.log('发送成功被服务器接收');
            return result
        }
    } catch (err) {
        console.log('发送失败')
        return err
    }
}
export function subscribeClientEvents(): IsubscribeClientEvents { //监听事件状态
    //连接状态发生改变的回调
    function ConnectionStateChangedEvent(): void {
        console.log('连接状态回调')
        client.on('ConnectionStateChanged', (...agr: string[]) => {
            console.log('ConnectionStateChanged', agr)
            switch (agr[0]) {
                case connectionState.RECONNECTING: //正在重连
                    console.log('正在重连')
                    break;
                case connectionState.CONNECTING: //正在连接
                    console.log('正在连接')
                    break;
                case connectionState.CONNECTED: //已经连接
                    console.log('已经连接')
                    break;
                case connectionState.ABORTED: //被踢下线
                    console.log('被踢下线')
                    break;
                case connectionState.DISCONNECTED: //用户未连接
                    console.log('用户未连接')
                    break
            }
        })

    }
    function MessageFromPeer(): void {
        client.on('MessageFromPeer', (...agr: string[]) => {
            console.log('收到用户的消息', agr)
        })
    }
    return {
        ConnectionStateChangedEvent,
        MessageFromPeer,
    }
}

