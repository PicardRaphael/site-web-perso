// import { PostContainer } from './containers/PostContainer';
// ... autres imports

import { UserContainer } from './user/UserContainer';

/**
 * RootContainer class that implements a singleton pattern.
 * Manages the dependencies for various containers like UserContainer.
 *
 * @class RootContainer
 */
export class RootContainer {
  private static instance: RootContainer;
  private userContainer: UserContainer;
  // private postContainer: PostContainer;

  private constructor() {
    this.userContainer = UserContainer.getInstance();
    // this.postContainer = PostContainer.getInstance();
  }

  /**
   * Gets the singleton instance of RootContainer.
   *
   * @returns {RootContainer} - The singleton instance of RootContainer.
   */
  public static getInstance(): RootContainer {
    if (!RootContainer.instance) {
      RootContainer.instance = new RootContainer();
    }
    return RootContainer.instance;
  }

  /**
   * Gets an instance of UserContainer.
   *
   * @returns {UserContainer} - An instance of UserContainer.
   */
  public getUserContainer(): UserContainer {
    return this.userContainer;
  }

  // public getPostContainer(): PostContainer {
  //   return this.postContainer;
  // }
}

/**
 * Singleton instance of RootContainer.
 *
 * @type {RootContainer}
 */
export const rootContainer = RootContainer.getInstance();
