import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import useSWR from "swr";
import Error from "next/error";
import { useFavouriteListState } from "@/store";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";

const ArtworkCardDetail = ({ objectID }) => {
  /**
   * todo: Get a reference to the "favouritesList" from the "favouritesAtom
   * Add a "showAdded" value to the state
   * Add a "favouritesClicked" function
   */
  const [favouritesList, setFavouritesList] = useFavouriteListState();
  const [showAdded, setShowAdded] = useState(false);

  /** function (to be invoked when the button) is clicked*/
  const favouritesClicked = async () => {
    if (showAdded) {
      setFavouritesList(await removeFromFavourites(objectID));
      setShowAdded(false);
    } else {
      setFavouritesList(await addToFavourites(objectID));
      setShowAdded(true);
    }
  };

  // Show added on mount
  const isShowAdded = () => setShowAdded(favouritesList?.includes(objectID));

  useEffect(() => {
    isShowAdded();
  }, []);

  /**
   * todo: Accepts a single "objectID" prop
   * Uses SWR to make a request:
   */
  const fetcher = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  const { data, error } = useSWR(
    objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      : null,
    fetcher
  );

  if (error) {
    // Handle any errors thrown by the hook
    return <Error statusCode={404} />;
  }
  if (data) {
    return (
      /**
       * render data property
       * in Cards
       */
      <Card style={{ width: "100%", marginTop: "5rem" }}>
        {data.primaryImage && (
          <Card.Img
            variant="top"
            src={
              data.primaryImage
                ? data.primaryImage
                : "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
            }
          />
        )}
        <Card.Body>
          <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
          <Card.Text style={{ margin: 0 }}>
            <strong>Date:</strong> {data.objectDate ? data.objectDate : "N/A"}
          </Card.Text>
          <Card.Text style={{ margin: 0 }}>
            <strong>Classification:</strong>{" "}
            {data.classification ? data.classification : "N/A"}
          </Card.Text>
          <Card.Text>
            <strong>Medium:</strong> {data.medium ? data.medium : "N/A"}
          </Card.Text>
          <Card.Text style={{ margin: 0 }}>
            <strong>Artist:</strong>{" "}
            {data.artistDisplayName ? (
              <span>
                {data.artistDisplayName}{" "}
                <a
                  href={data.artistWikidata_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  (wiki)
                </a>
              </span>
            ) : (
              "N/A"
            )}
          </Card.Text>
          <Card.Text style={{ margin: 0 }}>
            <strong>Credit Line:</strong>{" "}
            {data.creditLine ? data.creditLine : "N/A"}
          </Card.Text>
          <Card.Text>
            <strong>Dimensions:</strong>{" "}
            {data.dimensions ? data.dimensions : "N/A"}
          </Card.Text>
          <Button
            onClick={favouritesClicked}
            variant={showAdded ? "primary" : "outline-primary"}
          >
            {showAdded ? "+ Favourite (added)" : "+ Favourite"}
          </Button>
        </Card.Body>
      </Card>
    );
  } else {
    return null;
  }
};

export default ArtworkCardDetail;
