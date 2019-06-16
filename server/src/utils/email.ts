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
  to: string;
  subject: string;
  text?: string;
  html: string;
}
const sendMail = (mailOptions: MailOption) => {

  if (!clientIsValid) {
    console.warn("由于未初始化成功，邮件客户端发送被拒绝")
    return false;
  }

  transporter.sendMail({
    from: config.EMAIL_ACCOUNT,
    ...mailOptions
  }, (error, info) => {
    if (error) return console.warn("邮件发送失败", error)
  })
}


// ************************* template *************************
const tplStyle = `<!--By ohmyga--><meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no"><style>body{margin:0}.moe-card{width:800px;margin:20px auto;padding:10px;position:relative;border-radius:2px;box-shadow:0px 1px 11px 0px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);-webkit-box-shadow:0px 1px 11px 0px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}@media(max-width:800px){.moe-card{width:92%;margin-top:30px}}.moe-title{margin-top:12px}.moe-title:before{content:'';left:0;height:28px;margin-right:20px;position:absolute;transition:all .29s;border-left:4px solid #e91e63}.moe-title:after{left:0;content:'';width:100%;position:absolute;margin-top:42px;border-bottom:1px solid #eee}.moe-card a{color:#ff4081;transition:all .29s ease;text-decoration:none !important}.moe-card a:hover{transition:all .29s ease;text-shadow:0 1px 1px #ff80ab}.moe-body{font-size:16px;margin-top:36px}.moe-body .moe-d-1{padding:15px;margin-top:6px;border-radius:5px;margin-bottom:18px;background-color:#eee}.moe-body .moe-d-2{font-size:14px;margin-top:6px;font-weight:400}.moe-tip{font-size:13px;color:#999;}.moe-bold{font-weight:600;}</style>`


const ownerTpl = handlebars.compile(`${tplStyle}
<div class="moe-card">
  <h3 class="moe-title"><a href="{{siteLink}}">{{siteTitle}}</a> 上有新评论了~</h3>
  <div class="moe-body">
    {{#if pComment}}
      对于 <span class="moe-bold">{{pComment.author.name}}</span> 在文章<a href="{{postLink}}">《{{title}}》</a>上发表的评论：
      <div class="moe-d-1">{{pComment.content}}</div>
      <span class="moe-bold">{{authorName}}</span> 发表回复：
    {{else}}
    <span class="moe-bold">{{authorName}}</span> 在文章<a href="{{postLink}}">《{{title}}》</a>上发表评论：
    {{/if}}
    <div class="moe-d-1">{{content}}</div>
    <div class="moe-d-2">
      时间：{{time}}<br>
      邮箱：{{authorEmail}}<br>
      网站：<a href="{{authorSite}}" target="_blank" rel="noopener noreferrer">{{authorSite}}</a><br>
      IP：{{ip}}<br>
      <a href="{{viewLink}}">[查看评论]</a>&nbsp;|&nbsp;<a href="{{manageLink}}">[管理评论]</a>
    </div>
  </div>
</div>
`);

interface CommentData {
  authorName: string;
  authorEmail: string;
  authorSite: string;
  title: string;
  content: string;
  ip: string;
  postLink: string;
  pComment?: object | null;
  viewLink?: string;
  manageLink?: string;
}
const sendMailToOwner = (commentData: CommentData) => {
  sendMail({
    to: config.EMAIL_ACCOUNT,
    subject: '您有新的文章评论',
    html: ownerTpl({
      siteLink: config.AUTHOR_SITE,
      siteTitle: '博客',
      time: new Date().toLocaleString(),
      ...commentData
    })
  })
}


const replyTpl = handlebars.compile(`${tplStyle}
<div class="moe-card">
  <h3 class="moe-title">您在 <a href="{{siteLink}}">{{siteTitle}}</a> 上的留言有新回复啦！</h3>
  <div class="moe-body">
  <span class="moe-bold">{{pComment.author.name}}</span>，您曾在文章<a href="{{postLink}}">《{{title}}》</a>上发表过评论：
    <div class="moe-d-1">{{pComment.content}}</div>
    <span class="moe-bold">{{authorName}}</span> 给您的回复如下：
    <div class="moe-d-1">{{content}}</div>
    <div class="moe-d-3">
      <div>欢迎再次光临本站 哟(￣▽￣)"。</div><br>
      <div class='moe-tip'>ps: 如果您未在本站留言，对您的打扰表示抱歉，请忽略本邮件</div>
    </div>
  </div>
</div>
`);
interface ReplyData {
  authorName: string;
  title: string;
  content: string;
  ip: string;
  postLink: string;
  pComment: {
    author: {
      email: string;
      name: string;
      site: string;
    }
  };
}
const sendReply = (replyData: ReplyData) => {
  sendMail({
    to: replyData.pComment.author.email,
    subject: '您有新的回复',
    html: replyTpl({
      siteLink: config.AUTHOR_SITE,
      siteTitle: 'daskyrk的网站',
      time: new Date().toLocaleString(),
      ...replyData
    })
  })
}

export {
  sendMail,
  transporter,
  sendMailToOwner,
  sendReply,
}
