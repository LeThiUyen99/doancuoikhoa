<template>
  <div>
    <footer class="ftco-footer bg-bottom ftco-no-pt" :style="{'background-image': 'url(' + require('@/assets/images/bg_3.jpg') + ')'}">
      <div class="container">
        <div class="row mb-5">
          <div class="col-md pt-5">
            <div class="ftco-footer-widget pt-md-5 mb-4">
              <h2 class="ftco-heading-2">About</h2>
              <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
              <ul class="ftco-footer-social list-unstyled float-md-left float-lft">
                <li class="ftco-animate"><a href="#"><span class="fa fa-twitter" /></a></li>
                <li class="ftco-animate"><a href="#"><span class="fa fa-facebook" /></a></li>
                <li class="ftco-animate"><a href="#"><span class="fa fa-instagram" /></a></li>
              </ul>
            </div>
          </div>
          <div class="col-md pt-5 border-left">
            <div class="ftco-footer-widget pt-md-5 mb-4 ml-md-5">
              <h2 class="ftco-heading-2">Infromation</h2>
              <ul class="list-unstyled">
                <li><a href="#" class="py-2 d-block">Online Enquiry</a></li>
                <li><a href="#" class="py-2 d-block">General Enquiries</a></li>
                <li><a href="#" class="py-2 d-block">Booking Conditions</a></li>
                <li><a href="#" class="py-2 d-block">Privacy and Policy</a></li>
                <li><a href="#" class="py-2 d-block">Refund Policy</a></li>
                <li><a href="#" class="py-2 d-block">Call Us</a></li>
              </ul>
            </div>
          </div>
          <div class="col-md pt-5 border-left">
            <div class="ftco-footer-widget pt-md-5 mb-4">
              <h2 class="ftco-heading-2">Experience</h2>
              <ul class="list-unstyled">
                <li><a href="#" class="py-2 d-block">Adventure</a></li>
                <li><a href="#" class="py-2 d-block">Hotel and Restaurant</a></li>
                <li><a href="#" class="py-2 d-block">Beach</a></li>
                <li><a href="#" class="py-2 d-block">Nature</a></li>
                <li><a href="#" class="py-2 d-block">Camping</a></li>
                <li><a href="#" class="py-2 d-block">Party</a></li>
              </ul>
            </div>
          </div>
          <div class="col-md pt-5 border-left">
            <div class="ftco-footer-widget pt-md-5 mb-4">
              <h2 class="ftco-heading-2">Have a Questions?</h2>
              <div class="block-23 mb-3">
                <ul>
                  <li><span class="icon fa fa-map-marker" /><span class="text">203 Fake St. Mountain View, San Francisco, California, USA</span></li>
                  <li><a href="#"><span class="icon fa fa-phone" /><span class="text">+2 392 3929 210</span></a></li>
                  <li><a href="#"><span class="icon fa fa-paper-plane" /><span class="text">info@yourdomain.com</span></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 text-center">

            <!--          <p>&lt;!&ndash; Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. &ndash;&gt;-->
            <!--            Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i class="fa fa-heart" aria-hidden="true" /> by <a href="https://colorlib.com" target="_blank">Colorlib</a>-->
            <!--            &lt;!&ndash; Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. &ndash;&gt;</p>-->
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.mb-5, .my-5 {
  margin-bottom: 3rem !important;
}
.bg-bottom {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom center;
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
article, aside, figcaption, figure, footer, header, hgroup, main, nav, section {
  display: block; }
.blockquote-footer {
  display: block;
  font-size: 80%;
  color: #6c757d; }
.blockquote-footer::before {
  content: "\2014\00A0"; }
.card-footer {
  padding: 0.75rem 1.25rem;
  background-color: rgba(0, 0, 0, 0.03);
  border-top: 1px solid rgba(0, 0, 0, 0.125); }
.card-footer:last-child {
  border-radius: 0 0 calc(0.25rem - 1px) calc(0.25rem - 1px); }
.modal-dialog-scrollable .modal-footer {
  -ms-flex-negative: 0;
  flex-shrink: 0; }
.modal-footer {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  padding: 0.75rem;
  border-top: 1px solid #dee2e6;
  border-bottom-right-radius: calc(0.3rem - 1px);
  border-bottom-left-radius: calc(0.3rem - 1px); }
.modal-footer > * {
  margin: 0.25rem; }
.ftco-footer {
  font-size: 16px;
  padding: 7em 0;
  z-index: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.05); }
.ftco-footer .ftco-footer-logo {
  text-transform: uppercase;
  letter-spacing: .1em; }
.ftco-footer .ftco-footer-widget h2 {
  font-weight: normal;
  color: #000000;
  margin-bottom: 40px;
  font-size: 18px;
  font-weight: 600; }
.ftco-footer .ftco-footer-widget ul li a {
  color: rgba(0, 0, 0, 0.5); }
.ftco-footer .ftco-footer-widget ul li a span {
  color: rgba(0, 0, 0, 0.1); }
.ftco-footer .ftco-footer-widget .btn-primary {
  background: #fff !important;
  border: 2px solid #fff !important; }
.ftco-footer .ftco-footer-widget .btn-primary:hover {
  background: #fff;
  border: 2px solid #fff !important; }
.ftco-footer p {
  color: rgba(0, 0, 0, 0.5); }
.ftco-footer a {
  color: rgba(0, 0, 0, 0.5); }
.ftco-footer a:hover {
  color: #f15d30; }
.ftco-footer .ftco-heading-2 {
  font-size: 17px;
  font-weight: 400;
  color: #000000; }

.ftco-footer-social li {
  list-style: none;
  margin: 0 10px 0 0;
  display: inline-block; }
.ftco-footer-social li a {
  height: 40px;
  width: 40px;
  display: block;
  float: left;
  color: #f15d30;
  border-radius: 50%;
  position: relative;
  background: #f15d30; }
.ftco-footer-social li a span {
  position: absolute;
  font-size: 18px;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  color: #fff !important; }
.ftco-footer-social li a:hover {
  color: #f15d30; }

.footer-small-nav > li {
  display: inline-block; }
.footer-small-nav > li a {
  margin: 0 10px 10px 0; }
.footer-small-nav > li a:hover, .footer-small-nav > li a:focus {
  color: #f15d30; }
.media .ftco-icon {
  width: 100px; }
.media .ftco-icon span {
  color: #f15d30; }

.ftco-media {
  background: #fff;
  border-radius: 0px; }
.ftco-media .heading {
  font-weight: normal; }
.ftco-media.ftco-media-shadow {
  padding: 40px;
  background: #fff;
  -webkit-box-shadow: 0 10px 50px -15px rgba(0, 0, 0, 0.3);
  box-shadow: 0 10px 50px -15px rgba(0, 0, 0, 0.3);
  -webkit-transition: .2s all ease;
  -o-transition: .2s all ease;
  transition: .2s all ease;
  position: relative;
  top: 0; }
.ftco-media.ftco-media-shadow:hover, .ftco-media.ftco-media-shadow:focus {
  top: -3px;
  -webkit-box-shadow: 0 10px 70px -15px rgba(0, 0, 0, 0.3);
  box-shadow: 0 10px 70px -15px rgba(0, 0, 0, 0.3); }
.ftco-media .icon {
  font-size: 50px;
  display: block;
  color: #f15d30; }
.ftco-media.text-center .ftco-icon {
  margin: 0 auto; }

.ftco-overflow-hidden {
  overflow: hidden; }

.padding-top-bottom {
  padding-top: 120px;
  padding-bottom: 120px; }

#map {
  width: 100%; }

@media (max-width: 991.98px) {
  #map {
    height: 300px; } }
@media (min-width: 576px) {
  .card-group {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-flow: row wrap;
    flex-flow: row wrap; }
  .card-group > .card {
    -webkit-box-flex: 1;
    -ms-flex: 1 0 0%;
    flex: 1 0 0%;
    margin-bottom: 0; }
  .card-group > .card + .card {
    margin-left: 0;
    border-left: 0; }
  .card-group > .card:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0; }
  .card-group > .card:not(:last-child) .card-img-top,
  .card-group > .card:not(:last-child) .card-header {
    border-top-right-radius: 0; }
  .card-group > .card:not(:last-child) .card-img-bottom,
  .card-group > .card:not(:last-child) .card-footer {
    border-bottom-right-radius: 0; }
  .card-group > .card:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0; }
  .card-group > .card:not(:first-child) .card-img-top,
  .card-group > .card:not(:first-child) .card-header {
    border-top-left-radius: 0; }
  .card-group > .card:not(:first-child) .card-img-bottom,
  .card-group > .card:not(:first-child) .card-footer {
    border-bottom-left-radius: 0; } }
</style>
