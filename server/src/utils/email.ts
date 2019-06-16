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
// use https://templates.mailchimp.com/resources/inline-css/ generate inline style
const ownerTpl = handlebars.compile(`
<div style="width: 800px;margin: 20px auto;padding: 10px;position: relative;border-radius: 2px;box-shadow: 0px 1px 11px 0px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);-webkit-box-shadow: 0px 1px 11px 0px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);">
  <h3 style="margin-top: 12px;"><a href="{{siteLink}}" style="color: #ff4081;transition: all .29s ease;text-decoration: none !important;">{{siteTitle}}</a> 上有新评论了~</h3>
  <div style="font-size: 16px;margin-top: 36px;">
    {{#if pComment}}
      对于 <span style="font-weight: 600;">{{pComment.author.name}}</span> 在文章<a href="{{postLink}}" style="color: #ff4081;transition: all .29s ease;text-decoration: none !important;">《{{title}}》</a>上发表的评论：
      <div style="padding: 15px;margin-top: 6px;border-radius: 5px;margin-bottom: 18px;background-color: #eee;">{{pComment.content}}</div>
      <span style="font-weight: 600;">{{authorName}}</span> 发表回复：
    {{else}}
    <span style="font-weight: 600;">{{authorName}}</span> 在文章<a href="{{postLink}}" style="color: #ff4081;transition: all .29s ease;text-decoration: none !important;">《{{title}}》</a>上发表评论：
    {{/if}}
    <div style="padding: 15px;margin-top: 6px;border-radius: 5px;margin-bottom: 18px;background-color: #eee;">{{content}}</div>
    <div style="font-size: 14px;margin-top: 6px;font-weight: 400;">
      时间：{{time}}<br>
      邮箱：{{authorEmail}}<br>
      网站：<a href="{{authorSite}}" target="_blank" rel="noopener noreferrer" style="color: #ff4081;transition: all .29s ease;text-decoration: none !important;">{{authorSite}}</a><br>
      IP：{{ip}}<br>
      <a href="{{siteLink}}/api/comment/forbid?id={{commentId}}" target="_blank" rel="noopener noreferrer" style="color: #ff4081;transition: all .29s ease;text-decoration: none !important;">[屏蔽评论]</a>
      &nbsp;|&nbsp;
      <a href="{{siteLink}}/api/comment/delete?id={{commentId}}" target="_blank" rel="noopener noreferrer" style="color: #ff4081;transition: all .29s ease;text-decoration: none !important;">[删除评论]</a>
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
  commentId: string;
  ip: string;
  postLink: string;
  pComment?: object | null;
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


const replyTpl = handlebars.compile(`
<div style="width: 800px;margin: 20px auto;padding: 10px;position: relative;border-radius: 2px;box-shadow: 0px 1px 11px 0px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);-webkit-box-shadow: 0px 1px 11px 0px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);">
  <h3 style="margin-top: 12px;">您在 <a href="{{siteLink}}" style="color: #ff4081;transition: all .29s ease;text-decoration: none !important;">{{siteTitle}}</a> 上的留言有新回复啦！</h3>
  <div style="font-size: 16px;margin-top: 36px;">
  <span style="font-weight: 600;">{{pComment.author.name}}</span>，您曾在文章<a href="{{postLink}}" style="color: #ff4081;transition: all .29s ease;text-decoration: none !important;">《{{title}}》</a>上发表过评论：
    <div style="padding: 15px;margin-top: 6px;border-radius: 5px;margin-bottom: 18px;background-color: #eee;">{{pComment.content}}</div>
    <span style="font-weight: 600;">{{authorName}}</span> 给您的回复如下：
    <div style="padding: 15px;margin-top: 6px;border-radius: 5px;margin-bottom: 18px;background-color: #eee;">{{content}}</div>
    <div>
      <div>欢迎再次光临本站哟(￣▽￣)"。</div><br>
      <div style="font-size: 13px;color: #999;">ps: 如果您未在本站留言，对您的打扰表示抱歉，请忽略本邮件</div>
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
      siteTitle: 'lijun的网站',
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
