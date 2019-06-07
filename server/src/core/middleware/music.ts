// import { MusicClient } from 'netease-music-sdk'
import config from '@/config';


// const client = new MusicClient()
const client = {} as any;

let cookieCache = null;
let userCache: { cookie: string[]; data: any; } | null = null;
async function login() {
  try {
    await client.phoneLogin(config.NETEASE_PHONE, config.NETEASE_PWD);
    const { user, cookie } = client;
    if (user) {
      console.log('网易云音乐登陆成功：', user);
      cookieCache = cookie;
      userCache = user.toJSON()
    }
    return client;
  } catch (e) {
    console.log('网易云音乐登陆失败：', e);
  }
}

export async function musicMiddleware(req: any, res: any, next: () => any) {
  const { path } = req;
  if (path.startsWith('/api/music')) {
    // if (!userCache) {
    //   await login();
    // }
    const [type] = path.slice('/api/music/'.length).split('/');
    let data = {} as any;
    const { id } = req.query;
    if (!id) {
      return res.send({
        success: false,
        message: '没有提供参数id',
      });
    }
    switch (type) {
      case 'song':
        try {
          const songRes = await client.getSongInfo(id)
          if (songRes.code === 200) {
            const { id, name, ar, al } = songRes.songs[0];
            data = {
              id,
              title: name,
              cover: al.picUrl,
              album: al.name,
              artistList: ar,
            };
            // data.song = songRes.songs[0]
          }
        } catch (e) {
          console.error(`获取歌曲信息错误, id: ${id}`, e.message);
        }
        try {
          const linkRes = await client.getMusicUrl(id)
          if (linkRes.code === 200) {
            data.link = linkRes.data[0].url;
          }
        } catch (e) {
          console.error(`获取歌曲链接错误, id: ${id}`, e.message);
        }
        try {
          const lyricRes = await client.getSongLyric(id)
          console.log('lyricRes:', lyricRes);
          if (lyricRes.code === 200) {
            data.lyric = lyricRes;
          }
        } catch (e) {
          console.error(`获取歌词错误, id: ${id}`, e.message);
        }
        break;
      case 'playlist':
        try {
          const playlistRes = await client.getPlaylistInfo(id);
          if (playlistRes.code === 200) {
            data = playlistRes;
          }
        } catch (e) {
          console.error(`获取歌曲列表错误, id: ${id}`, e.message);
        }
        break;
      default:
        break;
    }
    return res.send({
      success: true,
      data,
    });
  }
  next();
}
