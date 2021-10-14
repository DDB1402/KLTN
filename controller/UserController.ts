import {
  BAD_REQUEST,
  DB_ERROR,
  SOCKET_LIST,
  SOCKET_NAMESPACE,
} from "../common/constants";
import { throwHttpError, throwValidateError } from "../common/functions";
import { UserDao } from "../Dao/UserDao";
import { Request, Response, NextFunction } from "express";
import { Maybe } from "../TS/Common";
import { Namespace, Socket } from "socket.io";
import { socketList } from "../socket/index";
import { DecodedUser } from "../models/User";
export class UserController {
  private UserDao: UserDao;

  constructor() {
    this.UserDao = new UserDao();
    this.getUserFriend = this.getUserFriend.bind(this);
    this.searchUserByEmailOrPhone = this.searchUserByEmailOrPhone.bind(this);
    this.viewRelationshipStatus = this.viewRelationshipStatus.bind(this);
  }

  public async getUserFriend(req: Request, res: Response, next: NextFunction) {
    const { id_user } = res.locals.decodeToken;
    try {
      const result = await this.UserDao.getListFriend(id_user);
      res.json({ listFriend: result });
    } catch (e) {
      throwHttpError(DB_ERROR, BAD_REQUEST, next);
    }
  }

  public async searchUserByEmailOrPhone(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (req.app.get(SOCKET_LIST)) {
      // const socketList = req.app.get(SOCKET_LIST);
      // const namespace: Namespace = req.app.get(SOCKET_LIST)["/USER"];
      const namespace2: Namespace = socketList["/CONVERSATION"];
    } else {
    }
    const { email = null, phone = null } = req.query;
    const userInfo:DecodedUser=res.locals.decodeToken;
    
    try {
      const result = await this.UserDao.searchUserByEmailOrPhone(
        email as Maybe<string>,
        phone as Maybe<string>,
        userInfo.id_user.toString()
      );

      // result.map((user)=>{
      //   delete 
      // })

      res.json({ result});
    } catch (err) {
      console.log(err);
      throwHttpError(DB_ERROR, BAD_REQUEST, next);
    }
  }

  public async viewRelationshipStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id_friend } = req.query;
    const userInfo: DecodedUser = res.locals.decodeToken;
    if (!id_friend) {
      res.status(BAD_REQUEST).json({ message: "Id friend required" });
      return;
    }

    try {
      const status = await this.UserDao.getFriendStatusBetween(
        userInfo.id_user.toString(),
        id_friend.toString() || ""
      );
      res.json({ status });
    } catch (err) {
      throwHttpError(DB_ERROR, BAD_REQUEST, next);
    }
  }
}
