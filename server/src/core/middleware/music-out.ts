import config from '@/config';
import axios from 'axios';

// https://api.ohmyga.cn/netease.php
export async function musicMiddleware(req: any, res: any, next: () => any) {
  const { path } = req;
  if (path.startsWith('/api/music')) {
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
          const songRes = await axios.get(`https://api.ohmyga.cn/netease/?id=${id}`)
          if (songRes.status === 200) {
            const { lyric, ...rest } = songRes.data;
            data = rest;
            const lrcRes = await axios.get(lyric)
            if (lrcRes.status === 200) {
              data.lyric = lrcRes.data;
            }
          }
        } catch (e) {
          console.error(`获取歌曲信息错误, id: ${id}`, e.message);
        }
        break;
      case 'playlist':
        try {
          const playRes = await axios.get(`https://api.ohmyga.cn/netease/?type=playlist&id=${id}`)
          if (playRes.status === 200) {
            data = playRes;
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
