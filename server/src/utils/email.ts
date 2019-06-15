import config from "@/config"
import nodemailer from "nodemailer"
import handlebars from "handlebars";


let clientIsValid = false

const transporter = nodemailer.createTransport({
  // secure: true,
  host: "smtp.qq.com",//网易163邮箱 smtp.163.com
  port: 465,//网易邮箱端口 25
  auth: {
    user: config.EMAIL_ACCOUNT,
    pass: config.EMAIL_PASSWORD
  }
})

const tplStyle = `<!--By ohmyga--><meta name="viewport"content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no">body{margin:0}.moe-card{width:800px;margin:20px auto;padding:10px;position:relative;border-radius:2px;box-shadow:0px 1px 11px 0px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);-webkit-box-shadow:0px 1px 11px 0px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}@media(max-width:800px){.moe-card{width:92%;margin-top:30px}}.moe-title{margin-top:12px}.moe-title:before{content:'';left:0;height:28px;margin-right:20px;position:absolute;transition:all .29s;border-left:4px solid #e91e63}.moe-title:after{left:0;content:'';width:100%;position:absolute;margin-top:42px;border-bottom:1px solid #eee}.moe-card a{color:#ff4081;transition:all .29s ease;text-decoration:none !important}.moe-card a:hover{transition:all .29s ease;text-shadow:0 1px 1px #ff80ab}.moe-body{font-size:16px;margin-top:36px}.moe-body .moe-d-1{padding:15px;margin-top:6px;border-radius:5px;margin-bottom:18px;background-color:#eee}.moe-body .moe-d-2{font-size:14px;margin-top:6px;font-weight:400}`

const ownerTpl = handlebars.compile(`${tplStyle}
<div class="moe-card">
  <h3 class="moe-title"><a href="{{site}}">{{siteTitle}}</a> 上有新评论了~</h3>
  <div class="moe-body">
    {{author}} 在文章<a href="{{postLink}}">《{{title}}》</a>上发表评论：
    <div class="moe-d-1">{{content}}</div>
    <div class="moe-d-2">IP：{{ip}}<br>
      时间：{{time}}<br>
      邮箱：{{mail}}<br>
      网站：{{authorSite}}<br>
      <a href="{{viewLink}}">[查看评论]</a>&nbsp;|&nbsp;<a href="{{manageLink}}">[管理评论]</a>
    </div>
  </div>
</div>
`);
const guestTpl = handlebars.compile(`${tplStyle}
<div class="moe-card">
  <h3 class="moe-title">您在 <a href="{{site}}">{{siteTitle}}</a> 上的留言有新回复啦！</h3>
  <div class="moe-body">
    {{author_p}}，您曾在文章<a href="{{postLink}}">《{{title}}》</a>上发表过评论：
    <div class="moe-d-1">{{text_p}}</div>
    {{author}} 给您的回复如下：
    <div class="moe-d-2">{{content}}</div>
    <div class="moe-d-3">详细回复内容请 <a href="{{permalink}}">点此</a> 查看
      <br>欢迎再次光临 <a href="{{site}}">{{siteTitle}}</a> 哟(￣▽￣)"。
    </div>
  </div>
</div>
`);

const verifyClient = () => {
  transporter.verify((error, success) => {
    if (error) {
      clientIsValid = false;
      console.warn("邮件客户端初始化连接失败，将在一小时后重试");
      setTimeout(verifyClient, 1000 * 60 * 60);
    } else {
      clientIsValid = true;
      console.log("邮件客户端初始化连接成功，随时可发送邮件");
    }
  })
}

verifyClient()

interface MailOption {
  from?: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

interface ownerTplData {
  site?: string;
  siteTitle?: string;
  author: string;
  authorSite: string;
  title: string;
  content: string;
  mail: string;
  ip: string;
  postLink: string;
  time?: number;
  viewLink?: string;
  manageLink?: string;
}
const sendMail = (mailOptions: MailOption, data: ownerTplData) => {

  if (!clientIsValid) {
    console.warn("由于未初始化成功，邮件客户端发送被拒绝")
    return false;
  }

  mailOptions.from = config.EMAIL_ACCOUNT;
  const now = new Date();
  const time = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

  if (mailOptions.from === config.EMAIL_ACCOUNT) {
    mailOptions.html = ownerTpl({
      site: config.AUTHOR_SITE,
      siteTitle: 'daskyrk的博客',
      time,
      ...data
    });
  }else {
    mailOptions.html = guestTpl({
      site: config.AUTHOR_SITE,
      siteTitle: 'daskyrk的博客',
      time,
      ...data
    });
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return console.warn("邮件发送失败", error)
    console.log("邮件发送成功", info.messageId, info.response)
  })
}

export {
  sendMail,
  transporter,
}
