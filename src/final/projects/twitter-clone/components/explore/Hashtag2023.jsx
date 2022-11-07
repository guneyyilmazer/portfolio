import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  bookmark,
  deleteHashtag2023Post,
} from "../../../../../features/Twitter/TwitterAppSlice";
import { PinFill, XLg } from "react-bootstrap-icons";
import TweetPage from "../TweetPage";
import Header from "../Header";

const Hashtag2023 = () => {
  const dispatch = useDispatch();
  const [isShown, setIsShown] = useState(true);
  const [tweetPage, setTweetPage] = useState({});
  const hashtag = useSelector((store) => store.twitter.hashtag2023);

  return (
    <div className="">
      {isShown ? (
        <div className="">
          <Header page="#2023" wheretopost={"hashtag2023"} />
          <div className="feed-container">
            <div className="feed container-fluid">
              {hashtag.map((post) => (
                <div className="position-relative" role="button" key={post.id}>
                  <div
                    className="d-flex p-2 rounded-5 m-2 mb-3 mt-0 bg-white"
                    onClick={() => {
                      setTweetPage(post);
                      setIsShown(false);
                    }}
                  >
                    <img className="profile-picture" src={post.imgSrc} />
                    <div className="Post-Body">
                      <div className="Post-Body-Header">
                        <h4>{post.userName}</h4>
                        <h5>{`@${post.handle}`}</h5>
                      </div>
                      <p>{post.postText}</p>
                      {post.postSrc !== "" ? (
                        <img
                          className="post-image img-fluid pe-5 mt-2"
                          src={post.postSrc}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <button
                    className="deletePost me-5"
                    onClick={() =>
                      dispatch(
                        bookmark({
                          userName: post.userName,
                          handle: post.handle,
                          postText: post.postText,
                          imgSrc: post.imgSrc,
                          postSrc: post.postSrc,
                          id: post.id,
                          userId: post.userId,
                        })
                      )
                    }
                  >
                    <PinFill />
                  </button>
                  <button
                    onClick={() => dispatch(deleteHashtag2023Post(post.id))}
                    className="deletePost position-absolute"
                  >
                    <span>
                      <XLg style={{ marginBottom: "3px" }} />
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <TweetPage
          hashtag="2023"
          post={tweetPage}
          setIsShown={setIsShown}
        ></TweetPage>
      )}
    </div>
  );
};
export default Hashtag2023;
