import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import GoogleMap from './GoogleMap';

import GOYANG_CENTER from '../const/goyang_center';

const LeftBox = styled.div`
  float: left;
  width: 80%;
  height: 100vh;
  display: flex;
`;

const RightBox = styled.div`
  float: right;
  width: 20%;
`;

const getInfoWindowString = place => `
    <div>
      <div style="font-size: 25px;">
        ${place.name} 의 감성 분석 결과
      </div>
      <div style="font-size: 16px;">
        <span style="color: grey">여행지 분류 : ${place.types[0]}</span>
      </div>
      <div style="font-size: 18px;">
        <span style="color: grey;">
        감성지수 : ${place.rating}
        </span>
        <span style="color: orange;">${String.fromCharCode(9733).repeat(Math.floor(place.rating))}</span><span style="color: lightgrey;">${String.fromCharCode(9733).repeat(5 - Math.floor(place.rating))}</span>
        
      </div>
      <div style="font-size: 18px;">
        <span style="color: grey;">리뷰 수 : ${place.review_count}</span>
      </div>
      <div>
        <h3 style="margin-bottom: 0; text-align: center">긍정어 Wordcloud</h3>
        <img src="/images/wordcloud/${place.name}_pos_wordcloud.png" onerror="this.onerror=null;this.src='/images/wordcloud/no_pos_words.png';" alt="pos_wordcloud"/>        
      </div>
      <div>
        <h3 style="margin-bottom: 0; text-align: center">부정어 Wordcloud</h3>
        <img src="/images/wordcloud/${place.name}_neg_wordcloud.png" onerror="this.onerror=null;this.src='/images/wordcloud/no_neg_words.png';" alt="neg_wordcloud" hspace="0"/>
      </div>
    </div>`;
const markers = [];
const infowindows = [];

const setMarkers = (map) => {
  markers.forEach((marker, i) => {
    marker.addListener('click', () => {
      infowindows.forEach(infoWindow => infoWindow.close());
      map.setCenter(marker.getPosition());
      infowindows[i].open(map, marker);
    });
  });
};

const handleApiLoaded = (map, maps, places) => {
  places.forEach((place) => {
    markers.push(new maps.Marker({
      position: {
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,
      },
      map,
    }));

    infowindows.push(new maps.InfoWindow({
      content: getInfoWindowString(place),
    }));
  });
  setMarkers(map);
};

class MarkerInfoWindowGmapsObj extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: [],
    };
  }

  componentDidMount() {
    fetch('places.json')
      .then(response => response.json())
      .then((data) => {
        data.results.forEach((result) => {
          result.show = false; // eslint-disable-line no-param-reassign
        });
        this.setState({ places: data.results });
      });
  }

  render() {
    const { places } = this.state;

    return (
      <Fragment>
        <LeftBox>
          <GoogleMap
            defaultCenter={GOYANG_CENTER}
            bootstrapURLKeys={{
              key: process.env.REACT_APP_MAP_KEY,
              language: 'ko',
              region: 'ko',
            }}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, places)}
          />
        </LeftBox>
        <RightBox>
          <span>TODO : 여행지 검색창 및 여행지 리스트 개발 필요</span>
        </RightBox>
      </Fragment>
    );
  }
}

export default MarkerInfoWindowGmapsObj;
