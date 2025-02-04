const PostService = require("../services/post-service");
const {
  SubscribeMessage,
  GetApiResponse,
  GetPagination,
  GetSortByFromRequest,
} = require("../utils");
const ApiLog = require("./middlewares/apilogs");


const { Validator } = require("node-input-validator");

module.exports = (app) => {
  const service = new PostService();
  // To listen
  // SubscribeMessage(channel, service);
  app.post("/post/create",  async (req, res, next) => {
    try {
      const v = new Validator(req.body, {
        post_name: "required",
      });
      const matched = await v.check();
      if (!matched) {
        return res.status(400).send(v.errors);
      }
      var data = await service.AddPost(req.body);
      data = data = await GetApiResponse(data);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.post("/posts",ApiLog,  async (req, res, next) => {
    try {
      const { limit, skip } = await GetPagination(req.body.page, req.body.size);
      var sortarray = await GetSortByFromRequest(
        req.body.orderbycolumnname,
        req.body.orderby
      );
      var data = await service.Posts(limit, skip, req.body, sortarray);
      data = await GetApiResponse(data);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  
  app.post("/getallreels",ApiLog,  async (req, res, next) => {
    try {
      const { limit, skip } = await GetPagination(req.body.page, req.body.size);
      var sortarray = await GetSortByFromRequest(
        req.body.orderbycolumnname,
        req.body.orderby
      );
      var data = await service.GetAllReels(limit, skip, req.body, sortarray);
      data = await GetApiResponse(data);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.post("/searchpost",  async (req, res, next) => {
    try {
      const v = new Validator(req.body, {
        search: "required",
      });
      const matched = await v.check();
      if (!matched) {
        return res.status(400).send(v.errors);
      }
      const { limit, skip } = await GetPagination(req.body.page, req.body.size);

      var data = await service.SearchPost(req.body.search,skip,limit);
      data = await GetApiResponse(data);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.post("/adminposts",  async (req, res, next) => {
    try {
      const { limit, skip } = await GetPagination(req.body.page, req.body.size);
      var sortarray = await GetSortByFromRequest(
        req.body.orderbycolumnname,
        req.body.orderby
      );
      var data = await service.AdminPosts(limit, skip, req.body, sortarray);
      data = await GetApiResponse(data);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });
  app.post("/postlike", ApiLog, async (req, res, next) => {
    try {
      const v = new Validator(req.body, {
        user: "required",
        post: "required",
      });
      const matched = await v.check();
      if (!matched) {
        return res.status(400).send(v.errors);
      }
      var data = await service.AddPostLike(req.body);
      data = data = await GetApiResponse(data);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });
  app.post("/getallpostlike",ApiLog,  async (req, res, next) => {
    try {
      const v = new Validator(req.body, {
        user: "required",
      });
      const matched = await v.check();
      if (!matched) {
        return res.status(400).send(v.errors);
      }
      var data = await service.GetAllPostLikes(req.body);
      data = data = await GetApiResponse(data);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });
  app.post("/postwishlist", ApiLog, async (req, res, next) => {
    try {
      const v = new Validator(req.body, {
        user: "required",
        post: "required",
      });
      const matched = await v.check();
      if (!matched) {
        return res.status(400).send(v.errors);
      }
      var data = await service.AddPostWishlist(req.body);
      data = data = await GetApiResponse(data);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });
  app.post("/getallwishlits",ApiLog,  async (req, res, next) => {
    try {
      const v = new Validator(req.body, {
        user: "required",
      });
      const matched = await v.check();
      if (!matched) {
        return res.status(400).send(v.errors);
      }
      var data = await service.GetAllPostWishlist(req.body);
      data = data = await GetApiResponse(data);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });
  app.post("/post/:id",  ApiLog,async (req, res, next) => {
    try {
      var data = await service.postById(req.params.id);
      data = await GetApiResponse(data);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });
  app.put("/post/:id",  async (req, res, next) => {
    try {
      const id = req.params.id;
      var formdata = req.body;
      console.log(formdata)
      formdata["id"] = id;
      var data = await service.UpdatePost(formdata);
      data = await GetApiResponse(data);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });
  app.delete("/post/:id",  async (req, res, next) => {
    try {

      var data = await service.DeletePost(req.params.id);
      data = await GetApiResponse([]);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });
  app.delete("/postlikeremove",  async (req, res, next) => {
    try {

      var data = await service.RemovePostLike(req.body);
      data = await GetApiResponse([]);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });
  app.delete("/postwishlistremove",  ApiLog,async (req, res, next) => {
    try {

      var data = await service.RemovePostWishlist(req.body);
      data = await GetApiResponse([]);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });
  app.get("/sentnotificationpost",  async (req, res, next) => {
    try {
      
      var data = await service.GetPostsForNotifictaion();
      data = await GetApiResponse(data);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });
  app.post("/script/updatepoetandcategory",  async (req, res, next) => {
    try {
      console.log("Sdsf")
      var data = await service.ScriptPOST();
      data = await GetApiResponse([]);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });
};
