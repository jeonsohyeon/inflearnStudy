/*__COMMON info__*/
let date = new Date();
let nowDate = `${date.getFullYear()}${date.getMonth() <= 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}${
  date.getDay() <= 10 ? `0${date.getDay()}` : date.getDay()
}`;

/*__API info__*/
const youtubeApiKey = 'AIzaSyBI0-zAQzl-46sZ-V8NnbB9eDcSzceCqPw';
const youtubeSearchUrl = `https://www.googleapis.com/youtube/v3/search?key=${youtubeApiKey}&`;

const movieApiKey = '59a5a2604a7ded34044ef08309d2a780';
const dailyBoxOffice = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${movieApiKey}`;
const movieInfo = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${movieApiKey}`;

const searchYoutube = keyword => {
  let searchKeyword = youtubeSearchUrl;
  let optionParams = {
    q: encodeURI(keyword),
    part: 'snippet',
    type: 'video',
    order: 'title',
    regionCode: 'KR',
    videoDuration: 'short',
    maxResults: 5
  };
  for (var option in optionParams) {
    searchKeyword += `${option}=${optionParams[option]}&`;
  }
  searchKeyword = searchKeyword.slice(0, searchKeyword.length - 1);
  fetchURL(searchKeyword, findYoutube);
};

const findYoutube = data => {
  let item = data.items;
  let length = item.length;
  let result = '';
  if (length === 0) {
    result += '<p>검색 결과가 없습니다.</p>';
  } else {
    result += `<ul>`;
    for (let i = 0; i < length; i++) {
      result += `<li>
        <a href="https://www.youtube.com/watch?v=${item[i].id.videoId}" target="_blank">
          <img src="${item[i].snippet.thumbnails.medium.url}" alt="${item[i].snippet.channelTitle}"/>
          <div class="desc-tit">
            <strong>${item[i].snippet.title}</strong>
            <p>${item[i].snippet.description}</p>
          </div>
        </a>
      </li>`;
    }
    result += `</ul>`;
  }
  let resultHtml = document.createElement('div');
  resultHtml.setAttribute('class', 'movie-youtube');
  resultHtml.innerHTML = [result].join('');

  document.querySelector('.movie-desc[data-search="true"]').after(resultHtml);
  document.querySelector('.movie-desc[data-search="true"]').removeAttribute('data-search');
};

const findRank = data => {
  let movieList = data.boxOfficeResult.dailyBoxOfficeList;
  let length = movieList.length;
  let ranking = `<ol class="list_ranking">`;
  for (let i = 0; i < length; i++) {
    ranking += `<li>
      <span class="desc_ranking">${i + 1}</span>
      <div class="desc_movie">
        ${movieList[i].rankOldAndNew === 'NEW' ? `<em>신규진입</em>` : ''}
        <strong class="tit_movie" data-moviecd="${movieList[i].movieCd}">${movieList[i].movieNm}</strong>
        <p><em>개봉</em> ${movieList[i].openDt}</p>
        <p><em>오늘</em> ${movieList[i].audiCnt}</p>
        <p><em>누적</em> ${movieList[i].audiAcc}</p>
        <p><em>전일대비</em> <span class="${movieList[i].rankInten > 0 ? 'up' : 'down'}">${
      movieList[i].rankInten > 0 ? parseInt(movieList[i].rankInten) + ' 상승' : parseInt(movieList[i].rankInten) + ' 하락'
    }</span></p>
      </div>
    </li>`;
  }
  ranking += `</ol>`;
  document.querySelector('.result').innerHTML = ranking;
};

const findInfo = data => {
  let movieDetail = data.movieInfoResult.movieInfo;
  let directors = (actors = '');
  for (let i = 0, length = movieDetail.directors.length; i < length; i++) {
    directors += `<a href="#none" class="search-ytb">${movieDetail.directors[i].peopleNm}</a>, `;
  }
  for (let j = 0; j < movieDetail.actors.length; j++) {
    actors += `<a href="#none" class="search-ytb">${movieDetail.actors[j].peopleNm}</a>, `;
  }
  directors = directors.slice(0, directors.length - 2);
  actors = actors.slice(0, actors.length - 2);

  let description = document.createElement('div');
  description.setAttribute('class', 'movie-desc');
  description.innerHTML = [`<p><em>감독</em> ${directors}</p>`, `<p><em>배우</em> ${actors}</p>`].join('');

  let tit = `.tit_movie[data-moviecd="${movieDetail.movieCd}"]`;
  let desc = `${tit} + .movie-desc`;
  document.querySelector(tit).setAttribute('data-detail', 'true');
  document.querySelector(tit).after(description);
};

const fetchURL = (url, callback) => {
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(res => {
      callback(res);
    })
    .catch(error => console.error(error));
};

/* event */
document.addEventListener('click', e => {
  if (e.target && e.target.className === 'ajaxsend') {
    let movieAPI = `${dailyBoxOffice}&targetDt=${nowDate}`;
    fetchURL(movieAPI, findRank);
  } else if (e.target && e.target.className === 'tit_movie') {
    let movieCd = e.target.dataset.moviecd;
    let movieAPI = `${movieInfo}&movieCd=${movieCd}`;
    if (e.target.dataset.detail) {
      return false;
    }
    fetchURL(movieAPI, findInfo);
  } else if (e.target && e.target.className === 'search-ytb') {
    e.preventDefault();
    let keyword = e.target.innerText;
    let $movieDesc = e.target.parentNode.parentNode;
    if ($movieDesc.nextSibling.className === 'movie-youtube') {
      $movieDesc.nextSibling.remove();
      $movieDesc.setAttribute('data-search', true);
      searchYoutube(keyword);
    } else {
      $movieDesc.setAttribute('data-search', true);
      searchYoutube(keyword);
    }
  }
});
