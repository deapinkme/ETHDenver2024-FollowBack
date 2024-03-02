const { fetchQuery, init } = require("@airstack/node");
const dotenv = require("dotenv");

dotenv.config();

init(process.env.AIRSTACK_API_KEY);

const ens = process.env.ENS_TEST;

// Check if localStorage is defined
if (typeof localStorage !== "undefined") {
} else {
  console.error("localStorage is not defined in this environment.");
}

/**
 * @param {string} identity - "fc_fname:us", "0x...", "us.eth"
 *
 * @returns {list} fansList - Followers data
 *
 */
const fetchFollowers = async (identity) => {
  try {
    const follower_query = `{
        SocialFollowers(
          input: { filter: { identity: { _eq: "${identity}" }}, blockchain: ALL }
        ) {
          Follower {
            followerSince
            followerAddress {
              addresses
              domains {
                name
              }
              socials {
                profileName
                userId
              }
            }
          }
        }
      }
    `;

    const { data, error } = await fetchQuery(follower_query);

    fansList = [];

    const followers = data.SocialFollowers.Follower;

    followers.forEach((follower) => {
      const userId = follower.followerAddress.socials[0].userId;
      const profileName = follower.followerAddress.socials[0].profileName;
      const address = follower.followerAddress.addresses[0];
      const since = follower.followerSince;

      const fan = {
        userId: userId,
        profileName: profileName,
        address: address,
        since: since,
      };

      fansList.push(fan);
    });

    if (error) {
      console.error("Error from fetchQuery:", error);
      return;
    }

    console.log(fansList);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

/**
 * @param {string} identity - "fc_fname:us", "0x...", "us.eth"
 * @returns {list} friendsList - List of friends
 */
const fetchFriends = async (identity) => {
  try {
    const friends_query = `{
      SocialFollowers(
        input: {filter: {identity: {_eq: "${identity}"}, dappName: {_eq: farcaster}}, blockchain: ALL, limit: 200}
      ) {
        Follower {
          followerSince
          followerAddress {
            socialFollowings(
              input: {filter: {identity: {_eq: "${identity}"}, dappName: {_eq: farcaster}}, limit: 200}
            ) {
              Following {
                followingSince
                followingAddress {
                  socials(input: {filter: {dappName: {_eq: farcaster}}}) {
                    fnames
                    profileName
                    userId
                    userAssociatedAddresses
                  }
                }
              }
            }
          }
        }
      }
    }`;

    const { data, error } = await fetchQuery(friends_query);

    friendsList = [];

    const filteredFollowings = data.SocialFollowers.Follower.flatMap(
      (follower) => follower.followerAddress.socialFollowings.Following || []
    ).filter((following) => following !== null);

    filteredFollowings.forEach((following) => {
      const profileName = following.followingAddress.socials[0].profileName;
      const userId = following.followingAddress.socials[0].userId;
      const address =
        following.followingAddress.socials[0].userAssociatedAddresses[0];
      const since = following.followingSince;

      const friend = {
        userId: userId,
        profileName: profileName,
        address: address,
        since: since,
      };

      friendsList.push(friend);
    });

    if (error) {
      console.error("Error from fetchQuery:", error);
      return;
    }

    console.log(friendsList);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export { fetchFollowers, fetchFriends };
