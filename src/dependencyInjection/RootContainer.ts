// import { PostContainer } from './containers/PostContainer';
// ... autres imports

import { UserContainer } from './user/UserContainer';

export class RootContainer {
  private static instance: RootContainer;
  private userContainer: UserContainer;
  // private postContainer: PostContainer;

  private constructor() {
    this.userContainer = UserContainer.getInstance();
    // this.postContainer = PostContainer.getInstance();
  }

  public static getInstance(): RootContainer {
    if (!RootContainer.instance) {
      RootContainer.instance = new RootContainer();
    }
    return RootContainer.instance;
  }

  public getUserContainer(): UserContainer {
    return this.userContainer;
  }

  // public getPostContainer(): PostContainer {
  //   return this.postContainer;
  // }
}

export const rootContainer = RootContainer.getInstance();
