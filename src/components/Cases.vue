<template>
    <div class="section-container">
        <div class="container">
            <div class="cases">
                <h2 class="heading heading-main">{{$t('cases')}}<span class="orange-color">:</span></h2>
                <swiper :options="swiperOption" ref="casesSwiper">
                    <swiper-slide class="d-flex align-items-center" v-for="(item, index) in cases" :key="index">
                        <div class="slider-item d-flex">
                            <div class="photo-block">
                                <lazy-component tag="div" v-if="item.mediaContentType === 'Video'">
                                    <iframe :src="item.videoUrl"
                                            class="video"
                                            frameborder="0"
                                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                            aria-label="video"
                                    >
                                    </iframe>
                                </lazy-component>
                                <img class="video" v-else v-lazy="item.imageUrl" alt="Case image">
                                <div class="bg-image"></div>
                            </div>
                            <div class="text-block">
                                <h2>{{item.title}}</h2>
                                <p class="description" v-html="item.description"></p>
                                <div class="horizontal-line"></div>
                                <div class="comment d-flex" v-if="item.includeComment">
                                    <div class="photo" v-if="item.commentImageUrl">
                                        <img :src="item.commentImageUrl" alt="comment author image">
                                    </div>
                                    <div class="text">
                                        <h3>{{item.commentAuthorName}}</h3>
                                        <p>{{item.commentDescription}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </swiper-slide>
                    <div v-if="showControls" class="swiper-button-prev" slot="button-prev" v-html="arrowSvg"></div>
                    <div
                            class="swiper-pagination"
                            slot="pagination"
                            ref="pagination"
                            :data-before="activeIndex"
                            :data-after="afterIndex"
                            v-if="showControls"
                    ></div>
                    <div v-if="showControls" class="swiper-button-next" slot="button-next" v-html="arrowSvg"></div>
                </swiper>
            </div>
        </div>
        <div class="container cases-footer footer-container">
            <Footer link="contacts"/>
        </div>
    </div>

</template>

<script>
  import Footer from './Footer';

  import arrowSvg from '../assets/img/arrow-grey.svg';
  import ScrollMagic from 'scrollmagic';
  import {TimelineMax} from "gsap/TweenMax";

  export default {
    name: 'Cases',

    props: ['cases'],

    components: {
      Footer
    },

    data() {
      return {
        arrowSvg,
        activeIndex: '',
        afterIndex: '02',
        showControls: this.cases.length > 1
      }
    },

    methods: {
      onSwipe(value) {
        const index = value.swiper.activeIndex;

        this.activeIndex = index === 0 ? '' : index < 10 ? '0' + index : index;

        this.afterIndex = this.cases.length === (index + 1)
          ? ''
          : (index + 2) < 10 ? '0' + (index + 2) : (index + 2);
      },
      addCasesAnimation() {
        const controller = new ScrollMagic.Controller(),
              casesAnimation = new TimelineMax()
                .fromTo($('.cases'), 1, {autoAlpha: 0, y: 20}, {autoAlpha: 1, y: 0, delay: 0.5}),
              hideFooterAnimation = new TimelineMax()
                .fromTo($('#cases .footer'), 1, {autoAlpha: 1}, {autoAlpha: $(window).innerWidth() > 420 ? 0 : 0.3, delay: 1.5});

        new ScrollMagic.Scene({
          triggerElement: ".cases",
          triggerHook: "onEnter",
          duration: '90%'
        })
          .setTween(casesAnimation)
          .addTo(controller);

        // hide footer
        new ScrollMagic.Scene({
          triggerElement: "#cases",
          triggerHook: "onLeave",
          duration: '80%'
        })
          .setTween(hideFooterAnimation)
          .addTo(controller);
      }
    },

    computed: {
      swiper() {
        return this.$refs.casesSwiper.swiper;
      }
    },

    mounted() {
      this.swiper.on('slideChange', () => this.onSwipe(this));
      this.addCasesAnimation();
    }
  }
</script>

<style scoped lang="scss">
    .cases-footer {
        margin-top: 100px;
    }

    .cases {
        height: $home-block-height;
        min-height: 700px;
        position: relative;
        margin: 0 auto;
        padding-top: 100px;
        z-index: 11;

        .heading-main {
            padding-left: 125px;
        }

        .slider-item {
            justify-content: center;
            align-items: center;
        }

        .photo-block {
            position: relative;
            min-width: 400px;

            // to compensate bg-image indent
            margin-right: 35px;
            margin-bottom: 20px;

            .video {
                background: $base-black;
                position: relative;
                z-index: 1;
                width: 420px;
                height: 315px;
            }

            img.video {
                object-position: top;
                object-fit: cover;
            }

            .bg-image {
                background: $extra-dark-grey;
                width: 105%;
                height: 100%;
                position: absolute;
                bottom: -20px;
                left: 20px;
            }
        }

        .text-block {
            color: $white;
            width: 50%;
            max-width: 400px;
            padding-left: 50px;

            h2 {
                font-weight: bold;
                line-height: 34px;
                font-size: $extra-medium-base-font-size;
                margin-bottom: 15px;
            }

            .description {
                font-weight: 500;
                line-height: 24px;
                font-size: $small-font-size;
                margin-bottom: 20px;
                max-height: 250px;
                overflow-y: auto;

                @include overflow-y-scroll();
            }
        }

        .horizontal-line {
            border-bottom: 2px solid $white;
            width: 40px;
        }

        .comment {
            margin-top: 30px;

            .photo {
                width: 80px;
                min-width: 65px;
                font-size: $tiny-font-size;

                img {
                    border-radius: 50%;
                    height: 60px;
                    width: 60px;
                    object-position: top;
                    object-fit: cover;
                }
            }

            .text {
                h3 {
                    font-weight: 500;
                    line-height: 20px;
                    font-size: $small-font-size;
                    margin-bottom: 5px;
                }

                p {
                    line-height: 20px;
                    font-size: $small-font-size;
                    color: $light-grey;

                    &:before,
                    &:after {
                        content: '"';
                    }
                }
            }
        }

        .tns-outer {
            width: 100%;
        }
    }

    @include media-max-width($lg-max) {
        .cases {
            .heading-main {
                padding-left: 40px;
            }
        }
    }

    @include media-max-width($md-max) {
        .cases {
            height: 100%;

            .heading-main {
                margin-bottom: 40px;
            }

            .slider-item {
                flex-direction: column;
                width: 100%;
            }

            .photo-block {
                margin-bottom: 50px;

                .bg-image {
                    width: 100%;
                }

                .video {
                    width: 520px;
                    height: 340px;
                }
            }

            .text-block {
                width: 90%;
                max-width: 100%;
                margin-bottom: 50px;
                padding-right: 30px;
                padding-left: 40px;
            }
        }
    }

    @include media-max-width($sm-max) {
        .cases-footer {
            margin-top: 0;
        }

        .cases {
            .text-block {
                margin-bottom: 100px;
            }

            .heading-main {
                padding-left: 10px;
            }

            .photo-block {
                .video {
                    width: 380px;
                    height: 260px;
                }
            }
        }
    }

    @include media-max-width($xs-max) {
        .cases {
            padding-top: 0;

            .photo-block {
                min-width: 200px;

                .video {
                    width: 320px;
                    height: 260px;
                }
            }
        }
    }

    @include media-max-width($mobile-sm) {
        .cases {
            .text-block {
                max-width: 90%;
                padding-left: 15px;
                padding-right: 15px;
            }

            .photo-block {
                padding-left: 10px;
                min-width: 150px;

                .video {
                    width: 90%;
                    height: 220px;
                }
            }
        }
    }
</style>