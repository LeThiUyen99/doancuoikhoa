<template>
  <div>
    <section id="headers">
      <section class="slick-carousel-slider">
        <div class="css-1t7eqdv">
          <div class="css-1n7wqvg">
            <span class="text css-gcc11p">Liên hệ với chúng tôi</span>
            <span class="text css-1b6fs5z mb-3">VGS Travel luôn sẵn sàng lắng nghe mọi ý kiến đóng góp của khách hàng nhằm cải thiện chất lượng dịch vụ và mang đến những trải nghiệm tốt nhất.</span>
            <span class="text css-1b6fs5z">Nếu bạn có bất cứ băn khoăn gì các dịch vụ &amp; sản phẩm du lịch golf, chúng tôi cũng luôn sẵn sàng hỗ trợ dù bạn ở bất cứ nơi đâu!</span>
          </div>
          <div class="css-a6wuni">
            <img class="css-53j7fx" src="https://vgstravel.com/images/bg-registration-form-7.jpg">
          </div>
        </div>
      </section>
      <section id="main" class="contact">
        <section class="container">
          <section class="css-1utvz5n">
            <section class="contact-form row">
              <section class="col-md-8">
                <h3>Gửi tin nhắn cho chúng tôi</h3>
                <form id="contact-form" class="mb-5" method="post" name="contactForm" novalidate="novalidate">
                  <input type="hidden" name="_token" value="ikw5fnGqW6EFjPNuwyhiWoZADCMov4yTtGIZEFON">
                  <div class="row">
                    <div class="col-md-6 form-group mb-2">
                      <label for="gender" class="col-form-label">Mr./Ms./Mrs.*</label>
                      <select id="gender" type="text" class="form-control" name="gender">
                        <option value="0">Mr</option>
                        <option value="1">Ms</option>
                        <option value="2">Mrs</option>
                        <option value="3">Miss</option>
                        <option value="4">Madam</option>
                        <option value="5">Sir</option>
                      </select>
                    </div>
                    <div class="col-md-6 form-group mb-2">
                      <label for="" class="col-form-label">Họ &amp; Tên *</label>
                      <input
                        id="name"
                        type="text"
                        class="form-control"
                        name="name"
                        placeholder="Họ & Tên"
                      >
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6 form-group mb-2">
                      <label for="" class="col-form-label">Email *</label>
                      <input id="email" type="text" class="form-control" name="email" placeholder="Email">
                    </div>

                    <div class="col-md-6 form-group mb-2">
                      <label for="" class="col-form-label">Số điện thoại</label>
                      <input
                        id="phone"
                        type="text"
                        class="form-control"
                        name="phone"
                        placeholder="Số điện thoại"
                      >
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12 form-group mb-2">
                      <label for="message" class="col-form-label">Để lại lời nhắn *</label>
                      <textarea
                        id="message"
                        class="form-control"
                        name="message"
                        cols="30"
                        rows="4"
                        placeholder="Để lại lời nhắn tại đây *"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12 form-group">
                      <input
                        type="submit"
                        value="Gửi tin nhắn"
                        class="btn btn-primary rounded-0 py-2 px-4"
                      >
                      <span class="submitting" />

                    </div>
                  </div>
                </form>
              </section>
              <section class="col-md-4">
                <h3 class="mb-5">CÔNG TY CỔ PHẦN DỊCH VỤ DU LỊCH GOLF VIỆT NAM</h3>
                <ul class="list-unstyled">
                  <li class="d-flex mt-5">
                    <i class="fas fa-map-marker-alt m-3" />
                    <span class="text">Số 20 Võ Chí Công, phường Nghĩa Đô, quận Cầu Giấy, Hà Nội - Việt Nam</span>
                  </li>
                  <li class="d-flex mt-5">
                    <i class="fas fa-phone m-3" />
                    <span class="text">(+84) 090 180 36 88 <br> 0936 425 552</span>
                  </li>
                  <li class="d-table mt-5">
                    <i class="fas fa-envelope-open m-3" />
                    <span class="text d-table-cell middle"><a href="mailto:contact@vgstravel.com" class="text-white">contact@vgstravel.com</a></span>
                  </li>
                </ul>
              </section>
            </section>
          </section>
          <section class="css-1utvz5n">
            <section class="row kooperieren">
              <section class="col-md-7 text">
                <div>
                  <h1 class="Titel"> MONG MUỐN HỢP TÁC</h1>
                  <p>VGS Travel mong muốn trở thành đối tác tin cậy của các doanh nghiệp trong việc kiến tạo các sản phẩm du lịch golf chất lượng thay cho lời tri ân của doanh nghiệp với các bạn hàng và đối tác.</p>
                  <p>Các tổ chức, doanh nghiệp có nhu cầu hay đề nghị hợp tác, vui lòng gửi email về cho chúng tôi tại <a href="mailto:contact@vgstravel.com">contact@vgstravel.com</a></p>
                </div>
              </section>
              <section class="col-md-5 foto">
                <a href="#" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                  <img class="w-100" src="https://vgstravel.com/images/contact/0001.jpg" alt="">
                </a>
              </section>
            </section>
          </section>
        </section>
      </section>
    </section>
  </div>
</template>

<script>
require('@/assets/css/main.css')
export default {
  name: 'Contact'
}
</script>

<style scoped>

</style>
