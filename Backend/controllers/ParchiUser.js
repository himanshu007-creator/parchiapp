const jwt = require('jsonwebtoken')
const ParchiUser = require('../models/user')

async function mainLink(req, res) {
  const ShortLink = req.params["id"];
  const username = await req.user.username;
  const userfound= await ParchiUser.findOne({ username: username });
  const urls = userfound.links;
  let found = false;
  var ans;
  urls.forEach((element) => {
    if (element.shortlink === ShortLink) {
      found = true;
      ans = element;
    }
  });
  if (found) {
    const rdrect = ans.url;
    var result = await ParchiUser.updateOne(
      { username: username, "links.shortlink": ShortLink },
      { $inc: { "links.$.visits": 1 } }
    );
    res.redirect(rdrect);
  } else {
    res.status(400).json("Not existing");
  }
}
async function createUrl(req, res) {
  const username = await req.user.username;
  const userfound= await ParchiUser.findOne({ username: username });
  if (!validURL(req.body.url)) {
    res.status(400).json("Invalid url " + req.body.url);
  } else {
    const link = {
      shortlink: req.body.shortlink.toLowerCase(),
      description: req.body.description,
      url: req.body.url,
      tags: req.body.tags,
      visits: 0,
      created_at: Date.now(),
    };
    const shortl = link.shortlink;
    var urls = await userfound.links;
    var valueArr = urls.map(function (item) {
      return item.shortlink;
    });
    var isThere = valueArr.some(function (i) {
      return i === shortl;
    });
    if (!isThere) {
      const result = await ParchiUser.updateOne(
        { username: username },
        { $push: { links: link } }
      );
      res.status(201).json(result);
    } else {
      res.status(400).json("Short URL of same name already exixts");
    }
  }
}

async function getFiles(req, res) {
  const username = req.user.username;
  const userfound= await ParchiUser.findOne({ username: username });
  var urls = userfound.links;
  if (req.query.sort == "asc") {
    urls.sort((a, b) => {
      let fa = a.shortlink.toLowerCase();
      let fb = b.shortlink.toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
  } else if (req.query.sort == "dsc") {
    urls.sort((a, b) => {
      let fa = a.shortlink.toLowerCase();
      let fb = b.shortlink.toLowerCase();

      if (fa < fb) {
        return 1;
      }
      if (fa > fb) {
        return -1;
      }
      return 0;
    });
  } else if (req.query.sortdate == "dsc") {
    urls.sort((a, b) => {
      let fa = Date.parse(a.created_at);
      let fb = Date.parse(b.created_at);

      if (fa < fb) {
        return 1;
      }
      if (fa > fb) {
        return -1;
      }
      return 0;
    });
  } else if (req.query.sortdate == "asc") {
    urls.sort((a, b) => {
      let fa = Date.parse(a.created_at);
      let fb = Date.parse(b.created_at);

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
  }
  res.status(200).json(urls);
}

async function deleteFile(req, res) {
  const rm = req.params.short;
  const username = req.user.username;
  const userfound= await ParchiUser.findOne({ username: username });
  var urls = await userfound.links;
  var valueArr = urls.map(function (item) {
    return item.shortlink;
  });
  var isThere = valueArr.some(function (i) {
    return i === rm;
  });
  if (isThere) {
    const result = await ParchiUser.updateOne(
      { username: username },
      { $pull: { links: { shortlink: rm } } },
      { multi: true }
    );
    res.status(201).json(result);
  } else {
    res.status(400).json("ParchiUser Invalid ");
  }
}
async function searchLinks(req, res) {
  const short = req.body.shortlink || null;
  const tag = req.body.tag || null;
  const username = req.user.username;
  const userfound= await ParchiUser.findOne({ username: username });
  if (userfound) {
    const urls = userfound.links;

    if (short !== null) {
      const result = urls.filter((e) => {
        return e.shortlink == short;
      });
      res.status(200).json(result);
    } else if (tag !== null) {
      const Tagresult = urls.filter((e) => {
        return e.tags.includes(tag);
      });
      res.status(200).json(Tagresult);
    }
  } else {
    res.status(400).json("USER DON'T EXIXT");
  }
}

// async function updateLink(req, res) {
//   // const short = req.body.shortlink || req.params["id"];
//   const newShort = req.body.newlink || null;
//   const ShortLink = req.params.id;
//   const username = await req.user.username;
//   const userfound= await ParchiUser.findOne({ username: username });
//   const urls = userfound.links;
//   let found = false;
//   var ans;
//   urls.forEach((element) => {
//     if (element.shortlink === ShortLink) {
//       found = true;
//       ans = element;
//     }
//   });
//   if (found) {
//     const rdrect = ans.url;
//     var result = await ParchiUser.updateOne(
//       { username: username, "links.shortlink": ShortLink },
//       { $inc: { "links.$.visits": 1 } },
//       {
//         $set: {
//           "links.$.ParchiUser": newShort,
//         },
//       }
//     );
//     res.status(200).json(result);
//   } else {
//     res.status(400).json("Not existing");
//   }
// }

module.exports = [getFiles,deleteFile]