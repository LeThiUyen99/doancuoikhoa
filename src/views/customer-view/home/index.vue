<template>
  <div>
    <section class="ftco-section services-section">
      <div class="container">
        <div class="row d-flex">
          <div class="col-md-6 order-md-last heading-section pl-md-5 ftco-animate d-flex align-items-center">
            <div class="w-100">
              <span class="subheading">Welcome to Pacific</span>
              <h2 class="mb-4">It's time to start your adventure</h2>
              <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
              <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
                A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
              <p><a href="#" class="btn btn-primary py-3 px-4">Search Destination</a></p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="row">
              <div class="col-md-12 col-lg-6 d-flex align-self-stretch ftco-animate">
                <div class="services services-1 color-1 d-block img" :style="{'background-image': 'url(' + require('@/assets/images/services-1.jpg') + ')'}">
                  <div class="icon d-flex align-items-center justify-content-center"><span class="flaticon-paragliding"></span></div>
                  <div class="media-body">
                    <h3 class="heading mb-3">Activities</h3>
                    <p>A small river named Duden flows by their place and supplies it with the necessary</p>
                  </div>
                </div>
              </div>
              <div class="col-md-12 col-lg-6 d-flex align-self-stretch ftco-animate">
                <div class="services services-1 color-2 d-block img" :style="{'background-image': 'url(' + require('@/assets/images/services-2.jpg') + ')'}">
                  <div class="icon d-flex align-items-center justify-content-center"><span class="flaticon-route"></span></div>
                  <div class="media-body">
                    <h3 class="heading mb-3">Travel Arrangements</h3>
                    <p>A small river named Duden flows by their place and supplies it with the necessary</p>
                  </div>
                </div>
              </div>
              <div class="col-md-12 col-lg-6 d-flex align-self-stretch ftco-animate">
                <div class="services services-1 color-3 d-block img" :style="{'background-image': 'url(' + require('@/assets/images/services-3.jpg') + ')'}">
                  <div class="icon d-flex align-items-center justify-content-center"><span class="flaticon-tour-guide"></span></div>
                  <div class="media-body">
                    <h3 class="heading mb-3">Private Guide</h3>
                    <p>A small river named Duden flows by their place and supplies it with the necessary</p>
                  </div>
                </div>
              </div>
              <div class="col-md-12 col-lg-6 d-flex align-self-stretch ftco-animate">
                <div class="services services-1 color-4 d-block img" :style="{'background-image': 'url(' + require('@/assets/images/services-4.jpg') + ')'}">
                  <div class="icon d-flex align-items-center justify-content-center"><span class="flaticon-map"></span></div>
                  <div class="media-body">
                    <h3 class="heading mb-3">Location Manager</h3>
                    <p>A small river named Duden flows by their place and supplies it with the necessary</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="ftco-section img ftco-select-destination" :style="{'background-image': 'url(' + require('@/assets/images/bg_3.jpg') + ')'}">
      <div class="container">
        <div class="row justify-content-center pb-4">
          <div class="col-md-12 heading-section text-center ftco-animate">
            <span class="subheading">Pacific Provide Places</span>
            <h2 class="mb-4">Select Your Destination</h2>
          </div>
        </div>
      </div>
      <div class="container container-2">
        <div class="row">
          <div class="col-md-12">
            <div class="carousel-destination owl-carousel ftco-animate">
              <div class="item">
                <div class="project-destination">
                  <a href="#" class="img" :style="{'background-image': 'url(' + require('@/assets/images/bg_1.jpg') + ')'}">
                    <div class="text">
                      <h3>Philippines</h3>
                      <span>8 Tours</span>
                    </div>
                  </a>
                </div>
              </div>
              <div class="item">
                <div class="project-destination">
                  <a href="#" class="img" :style="{'background-image': 'url(' + require('@/assets/images/place-2.jpg') + ')'}">
                    <div class="text">
                      <h3>Canada</h3>
                      <span>2 Tours</span>
                    </div>
                  </a>
                </div>
              </div>
              <div class="item">
                <div class="project-destination">
                  <a href="#" class="img" :style="{'background-image': 'url(' + require('@/assets/images/place-3.jpg') + ')'}">
                    <div class="text">
                      <h3>Thailand</h3>
                      <span>5 Tours</span>
                    </div>
                  </a>
                </div>
              </div>
              <div class="item">
                <div class="project-destination">
                  <a href="#" class="img" :style="{'background-image': 'url(' + require('@/assets/images/place-4.jpg') + ')'}">
                    <div class="text">
                      <h3>Autralia</h3>
                      <span>5 Tours</span>
                    </div>
                  </a>
                </div>
              </div>
              <div class="item">
                <div class="project-destination">
                  <a href="#" class="img" :style="{'background-image': 'url(' + require('@/assets/images/place-5.jpg') + ')'}">
                    <div class="text">
                      <h3>Greece</h3>
                      <span>7 Tours</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="ftco-section">
      <div class="container">
        <div class="row justify-content-center pb-4">
          <div class="col-md-12 heading-section text-center ftco-animate">
            <span class="subheading">Destination</span>
            <h2 class="mb-4">Tour Destination</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 ftco-animate">
            <div class="project-wrap">
              <a href="#" class="img" :style="{'background-image': 'url(' + require('@/assets/images/destination-1.jpg') + ')'}">
                <span class="price">$550/person</span>
              </a>
              <div class="text p-4">
                <span class="days">8 Days Tour</span>
                <h3><a href="#">Banaue Rice Terraces</a></h3>
                <p class="location"><span class="fa fa-map-marker"></span> Banaue, Ifugao, Philippines</p>
                <ul>
                  <li><span class="flaticon-shower"></span>2</li>
                  <li><span class="flaticon-king-size"></span>3</li>
                  <li><span class="flaticon-mountains"></span>Near Mountain</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-4 ftco-animate">
            <div class="project-wrap">
              <a href="#" class="img" :style="{'background-image': 'url(' + require('@/assets/images/destination-2.jpg') + ')'}">
                <span class="price">$550/person</span>
              </a>
              <div class="text p-4">
                <span class="days">10 Days Tour</span>
                <h3><a href="#">Banaue Rice Terraces</a></h3>
                <p class="location"><span class="fa fa-map-marker"></span> Banaue, Ifugao, Philippines</p>
                <ul>
                  <li><span class="flaticon-shower"></span>2</li>
                  <li><span class="flaticon-king-size"></span>3</li>
                  <li><span class="flaticon-sun-umbrella"></span>Near Beach</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-4 ftco-animate">
            <div class="project-wrap">
              <a href="#" class="img" :style="{'background-image': 'url(' + require('@/assets/images/destination-3.jpg') + ')'}">
                <span class="price">$550/person</span>
              </a>
              <div class="text p-4">
                <span class="days">7 Days Tour</span>
                <h3><a href="#">Banaue Rice Terraces</a></h3>
                <p class="location"><span class="fa fa-map-marker"></span> Banaue, Ifugao, Philippines</p>
                <ul>
                  <li><span class="flaticon-shower"></span>2</li>
                  <li><span class="flaticon-king-size"></span>3</li>
                  <li><span class="flaticon-sun-umbrella"></span>Near Beach</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="col-md-4 ftco-animate">
            <div class="project-wrap">
              <a href="#" class="img" :style="{'background-image': 'url(' + require('@/assets/images/destination-4.jpg') + ')'}">
                <span class="price">$550/person</span>
              </a>
              <div class="text p-4">
                <span class="days">8 Days Tour</span>
                <h3><a href="#">Banaue Rice Terraces</a></h3>
                <p class="location"><span class="fa fa-map-marker"></span> Banaue, Ifugao, Philippines</p>
                <ul>
                  <li><span class="flaticon-shower"></span>2</li>
                  <li><span class="flaticon-king-size"></span>3</li>
                  <li><span class="flaticon-sun-umbrella"></span>Near Beach</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-4 ftco-animate">
            <div class="project-wrap">
              <a href="#" class="img" :style="{'background-image': 'url(' + require('@/assets/images/destination-5.jpg') + ')'}">
                <span class="price">$550/person</span>
              </a>
              <div class="text p-4">
                <span class="days">10 Days Tour</span>
                <h3><a href="#">Banaue Rice Terraces</a></h3>
                <p class="location"><span class="fa fa-map-marker"></span> Banaue, Ifugao, Philippines</p>
                <ul>
                  <li><span class="flaticon-shower"></span>2</li>
                  <li><span class="flaticon-king-size"></span>3</li>
                  <li><span class="flaticon-sun-umbrella"></span>Near Beach</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-4 ftco-animate">
            <div class="project-wrap">
              <a href="#" class="img" :style="{'background-image': 'url(' + require('@/assets/images/destination-6.jpg') + ')'}">
                <span class="price">$550/person</span>
              </a>
              <div class="text p-4">
                <span class="days">7 Days Tour</span>
                <h3><a href="#">Banaue Rice Terraces</a></h3>
                <p class="location"><span class="fa fa-map-marker"></span> Banaue, Ifugao, Philippines</p>
                <ul>
                  <li><span class="flaticon-shower"></span>2</li>
                  <li><span class="flaticon-king-size"></span>3</li>
                  <li><span class="flaticon-sun-umbrella"></span>Near Beach</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="ftco-section ftco-about img" :style="{'background-image': 'url(' + require('@/assets/images/bg_4.jpg') + ')'}">
      <div class="overlay"></div>
      <div class="container py-md-5">
        <div class="row py-md-5">
          <div class="col-md d-flex align-items-center justify-content-center">
            <a href="https://vimeo.com/45830194" class="icon-video popup-vimeo d-flex align-items-center justify-content-center mb-4">
              <span class="fa fa-play"></span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="ftco-section ftco-about ftco-no-pt img">
      <div class="container">
        <div class="row d-flex">
          <div class="col-md-12 about-intro">
            <div class="row">
              <div class="col-md-6 d-flex align-items-stretch">
                <div class="img d-flex w-100 align-items-center justify-content-center" :style="{'background-image': 'url(' + require('@/assets/images/about-1.jpg') + ')'}">
                </div>
              </div>
              <div class="col-md-6 pl-md-5 py-5">
                <div class="row justify-content-start pb-3">
                  <div class="col-md-12 heading-section ftco-animate">
                    <span class="subheading">About Us</span>
                    <h2 class="mb-4">Make Your Tour Memorable and Safe With Us</h2>
                    <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                    <p><a href="#" class="btn btn-primary">Book Your Destination</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="ftco-section testimony-section bg-bottom" :style="{'background-image': 'url(' + require('@/assets/images/bg_1.jpg') + ')'}">
      <div class="overlay"></div>
      <div class="container">
        <div class="row justify-content-center pb-4">
          <div class="col-md-7 text-center heading-section heading-section-white ftco-animate">
            <span class="subheading">Testimonial</span>
            <h2 class="mb-4">Tourist Feedback</h2>
          </div>
        </div>
        <div class="row ftco-animate">
          <div class="col-md-12">
            <div class="carousel-testimony owl-carousel">
              <div class="item">
                <div class="testimony-wrap py-4">
                  <div class="text">
                    <p class="star">
                      <span class="fa fa-star"></span>
                      <span class="fa fa-star"></span>
                      <span class="fa fa-star"></span>
                      <span class="fa fa-star"></span>
                      <span class="fa fa-star"></span>
                    </p>
                    <p class="mb-4">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                    <div class="d-flex align-items-center">
                      <div class="user-img" :style="{'background-image': 'url(' + require('@/assets/images/person_1.jpg') + ')'}"></div>
                      <div class="pl-3">
                        <p class="name">Roger Scott</p>
                        <span class="position">Marketing Manager</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="testimony-wrap py-4">
                  <div class="text">
                    <p class="star">
                      <span class="fa fa-star"></span>
                      <span class="fa fa-star"></span>
                      <span class="fa fa-star"></span>
                      <span class="fa fa-star"></span>
                      <span class="fa fa-star"></span>
                    </p>
                    <p class="mb-4">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                    <div class="d-flex align-items-center">
                      <div class="user-img" :style="{'background-image': 'url(' + require('@/assets/images/person_2.jpg') + ')'}"></div>
                      <div class="pl-3">
                        <p class="name">Roger Scott</p>
                        <span class="position">Marketing Manager</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="testimony-wrap py-4">
                  <div class="text">
                    <p class="star">
                      <span class="fa fa-star"></span>
                      <span class="fa fa-star"></span>
                      <span class="fa fa-star"></span>
                      <span class="fa fa-star"></span>
                      <span class="fa fa-star"></span>
                    </p>
                    <p class="mb-4">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                    <div class="d-flex align-items-center">
                      <div class="user-img" :style="{'background-image': 'url(' + require('@/assets/images/person_3.jpg') + ')'}"></div>
                      <div class="pl-3">
                        <p class="name">Roger Scott</p>
                        <span class="position">Marketing Manager</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="testimony-wrap py-4">
                  <div class="text">
                    <p class="star">
                      <span class="fa fa-star"></span>
                      <span class="fa fa-star"></span>
                      <span class="fa fa-star"></span>
                      <span class="fa fa-star"></span>
                      <span class="fa fa-star"></span>
                    </p>
                    <p class="mb-4">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                    <div class="d-flex align-items-center">
                      <div class="user-img" :style="{'background-image': 'url(' + require('@/assets/images/person_1.jpg') + ')'}"></div>
                      <div class="pl-3">
                        <p class="name">Roger Scott</p>
                        <span class="position">Marketing Manager</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="testimony-wrap py-4">
                  <div class="text">
                    <p class="star">
                      <span class="fa fa-star"></span>
                      <span class="fa fa-star"></span>
                      <span class="fa fa-star"></span>
                      <span class="fa fa-star"></span>
                      <span class="fa fa-star"></span>
                    </p>
                    <p class="mb-4">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                    <div class="d-flex align-items-center">
                      <div class="user-img" :style="{'background-image': 'url(' + require('@/assets/images/person_2.jpg') + ')'}"></div>
                      <div class="pl-3">
                        <p class="name">Roger Scott</p>
                        <span class="position">Marketing Manager</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="ftco-section">
      <div class="container">
        <div class="row justify-content-center pb-4">
          <div class="col-md-12 heading-section text-center ftco-animate">
            <span class="subheading">Our Blog</span>
            <h2 class="mb-4">Recent Post</h2>
          </div>
        </div>
        <div class="row d-flex">
          <div class="col-md-4 d-flex ftco-animate">
            <div class="blog-entry justify-content-end">
              <a href="blog-single.html" class="block-20" :style="{'background-image': 'url(' + require('@/assets/images/image_1.jpg') + ')'}">
              </a>
              <div class="text">
                <div class="d-flex align-items-center mb-4 topp">
                  <div class="one">
                    <span class="day">11</span>
                  </div>
                  <div class="two">
                    <span class="yr">2020</span>
                    <span class="mos">September</span>
                  </div>
                </div>
                <h3 class="heading"><a href="#">Most Popular Place In This World</a></h3>
                <!-- <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p> -->
                <p><a href="#" class="btn btn-primary">Read more</a></p>
              </div>
            </div>
          </div>
          <div class="col-md-4 d-flex ftco-animate">
            <div class="blog-entry justify-content-end">
              <a href="blog-single.html" class="block-20" :style="{'background-image': 'url(' + require('@/assets/images/image_2.jpg') + ')'}">
              </a>
              <div class="text">
                <div class="d-flex align-items-center mb-4 topp">
                  <div class="one">
                    <span class="day">11</span>
                  </div>
                  <div class="two">
                    <span class="yr">2020</span>
                    <span class="mos">September</span>
                  </div>
                </div>
                <h3 class="heading"><a href="#">Most Popular Place In This World</a></h3>
                <!-- <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p> -->
                <p><a href="#" class="btn btn-primary">Read more</a></p>
              </div>
            </div>
          </div>
          <div class="col-md-4 d-flex ftco-animate">
            <div class="blog-entry">
              <a href="blog-single.html" class="block-20" :style="{'background-image': 'url(' + require('@/assets/images/image_3.jpg') + ')'}">
              </a>
              <div class="text">
                <div class="d-flex align-items-center mb-4 topp">
                  <div class="one">
                    <span class="day">11</span>
                  </div>
                  <div class="two">
                    <span class="yr">2020</span>
                    <span class="mos">September</span>
                  </div>
                </div>
                <h3 class="heading"><a href="#">Most Popular Place In This World</a></h3>
                <!-- <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p> -->
                <p><a href="#" class="btn btn-primary">Read more</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="ftco-intro ftco-section ftco-no-pt">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-12 text-center">
            <div class="img" :style="{'background-image': 'url(' + require('@/assets/images/bg_2.jpg') + ')'}">
              <div class="overlay"></div>
              <h2>We Are Pacific A Travel Agency</h2>
              <p>We can manage your dream building A small river named Duden flows by their place</p>
              <p class="mb-0"><a href="#" class="btn btn-primary px-4 py-3">Ask For A Quote</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Index'
}
</script>

<style scoped>
body {
  font-family: "Poppins", Arial, sans-serif;
  background: #fff;
  font-size: 16px;
  line-height: 1.8;
  font-weight: 400;
  color: #999999;
}
.ftco-no-pb {
  padding-bottom: 0 !important;
}
.ftco-no-pt {
  padding-top: 0 !important;
}
.ftco-section {
  padding: 7em 0;
  position: relative;
  width: 100%;
}
.ftco-section {
  padding: 7em 0;
  position: relative;
  width: 100%;
}
.container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.d-flex {
  display: -webkit-box !important;
  display: -ms-flexbox !important;
  display: flex !important;
}
.row {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}
/*.ftco-animate {*/
/*  opacity: 0;*/
/*  visibility: hidden;*/
/*}*/
.align-items-center {
  -webkit-box-align: center !important;
  -ms-flex-align: center !important;
  align-items: center !important;
}
.w-100 {
  width: 100% !important;
}
.heading-section .subheading {
  font-size: 30px;
  display: block;
  margin-bottom: 5px;
  color: #f15d30;
  font-family: "Arizonia", cursive;
}
.heading-section h2 {
  font-size: 40px;
  font-weight: 600;
  line-height: 1.4;
}
.mb-4, .my-4 {
  margin-bottom: 1.5rem !important;
}
h1, h2, h3, h4, h5, .h1, .h2, .h3, .h4, .h5 {
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.8);
  font-weight: 400;
  font-family: "Poppins", Arial, sans-serif;
}
h2, .h2 {
  font-size: 2rem;
}
h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
  margin-bottom: 0.5rem;
  font-weight: 500;
  line-height: 1.2;
}
h1, h2, h3, h4, h5, h6 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}
*, *::before, *::after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
p {
  margin-top: 0;
  margin-bottom: 1rem;
}
.col-md-6 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 50%;
  flex: 0 0 50%;
  max-width: 50%;
}
.services.services-1 {
  width: 100%;
  background: #f15d30;
  padding: 30px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  position: relative;
  margin-bottom: 30px;
  z-index: 0;
}
.img, .blog-img, .user-img {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
.services {
  -moz-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.services.services-1 .icon {
  width: 115px;
  height: 80px;
  margin-left: -35px;
  margin-bottom: 10px;
  background: #f15d30;
  position: relative;
}

.services .icon {
  line-height: 1.3;
  position: relative;
}
.justify-content-center {
  -webkit-box-pack: center !important;
  -ms-flex-pack: center !important;
  justify-content: center !important;
}
.services.services-1 .icon span {
  color: #fff;
  font-size: 50px;
}

.services .icon span {
  font-size: 60px;
  color: #f15d30;
}
.flaticon-paragliding:before {
  content: "\f103";
}
[class^="flaticon-"]:before, [class*=" flaticon-"]:before, [class^="flaticon-"]:after, [class*=" flaticon-"]:after {
  font-family: Flaticon;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.services.services-1 .icon:after {
  position: absolute;
  top: -5px;
  left: 0;
  content: '';
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 0 5px 5px;
  border-color: transparent transparent #c7390d transparent;
}
.col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col, .col-auto, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-sm-auto, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-md-auto, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-lg-auto, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl, .col-xl-auto {
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;}
.btn:not(:disabled):not(.disabled) {
  cursor: pointer;
}
.btn.btn-primary {
  background: #f15d30 !important;
  border: 1px solid #f15d30 !important;
  color: #fff !important;
}
.btn {
  cursor: pointer;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  -ms-border-radius: 4px;
  border-radius: 4px;
  -webkit-box-shadow: 0px 24px 36px -11px rgb(0 0 0 / 9%);
  -moz-box-shadow: 0px 24px 36px -11px rgba(0, 0, 0, 0.09);
  box-shadow: 0px 24px 36px -11px rgb(0 0 0 / 9%);
}

.pl-4, .px-4 {
  padding-left: 1.5rem !important;
}
.pr-4, .px-4 {
  padding-right: 1.5rem !important;
}
.pb-3, .py-3 {
  padding-bottom: 1rem !important;
}
.pt-3, .py-3 {
  padding-top: 1rem !important;
}
.btn-primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}
.align-self-stretch {
  -ms-flex-item-align: stretch !important;
  -ms-grid-row-align: stretch !important;
  align-self: stretch !important;
}
.services.services-1 .media-body {
  color: rgba(255, 255, 255, 0.8);
}
.media-body {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.services.services-1 .media-body h3 {
  color: #fff;
}
.services .media-body h3 {
  font-size: 18px;
  font-weight: 500;
}
.mb-3, .my-3 {
  margin-bottom: 1rem !important;
}
h1, h2, h3, h4, h5, .h1, .h2, .h3, .h4, .h5 {
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.8);
  font-weight: 400;
  font-family: "Poppins", Arial, sans-serif;
}
h3, .h3 {
  font-size: 1.75rem;
}
h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
  margin-bottom: 0.5rem;
  font-weight: 500;
  line-height: 1.2;
}
h1, h2, h3, h4, h5, h6 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}
*, *::before, *::after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.services.color-1:after {
  background: #1089ff;
}
.services.color-2:after {
  background: #048998;
}
.services.services-1:after {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  content: '';
  opacity: .5;
  z-index: -1;
}
.services.color-3:after {
  background: #00a8b5;
}
.services.color-4:after {
  background: #ff5959;
}
@media (min-width: 1200px) {
  .container, .container-sm, .container-md, .container-lg, .container-xl {
    max-width: 1140px;
  }
}
@media (min-width: 768px){
  .col-md-6 {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 50%;
    flex: 0 0 50%;
    max-width: 50%;
  }
}
</style>
