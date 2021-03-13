import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/@core/Component/BaseComponent/BaseComponent';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class FavoritesComponent extends BaseComponent implements OnInit {
  public adsImagesPath = 'assets/img/ads/';
  public adsList = [
    {
      id: 1,
      title: 'شاشة العرض LED للإيجار للإعلان لوحات كاملة الألوان',
      image: 'ads1.png',
      description: 'رفوف كامله دهان كتروستاتيك معالج ضد الصدا حمولة الرف 80 كيلو',
      price: 3200,
      owner: 'مصطفي خالد',
      badge: 'قابل للمزايدة',
      isFavorite: true
    },
    {
      id: 2,
      title: 'شاشة العرض LED للإيجار للإعلان لوحات كاملة الألوان',
      image: 'ads2.png',
      description: 'رفوف كامله دهان كتروستاتيك معالج ضد الصدا حمولة الرف 80 كيلو',
      price: 4300,
      owner: 'السيد حسان',
      badge: '',
      isFavorite: true
    },
    {
      id: 3,
      title: 'شاشة العرض LED للإيجار للإعلان لوحات كاملة الألوان',
      image: 'ads3.png',
      description: 'رفوف كامله دهان كتروستاتيك معالج ضد الصدا حمولة الرف 80 كيلو',
      price: 6000,
      owner: 'طاهر الطاهر',
      badge: '',
      isFavorite: true
    },
    {
      id: 4,
      title: 'شاشة العرض LED للإيجار للإعلان لوحات كاملة الألوان',
      image: 'ads4.png',
      description: 'رفوف كامله دهان كتروستاتيك معالج ضد الصدا حمولة الرف 80 كيلو',
      price: 2200,
      owner: 'سالم السالم',
      badge: 'قابل للمزايدة',
      isFavorite: true
    },
    {
      id: 5,
      title: 'شاشة العرض LED للإيجار للإعلان لوحات كاملة الألوان',
      image: 'ads5.png',
      description: 'رفوف كامله دهان كتروستاتيك معالج ضد الصدا حمولة الرف 80 كيلو',
      price: 7200,
      owner: 'عمر صلاح',
      badge: '',
      isFavorite: true
    },
    {
      id: 6,
      title: 'شاشة العرض LED للإيجار للإعلان لوحات كاملة الألوان',
      image: 'ads6.png',
      description: 'رفوف كامله دهان كتروستاتيك معالج ضد الصدا حمولة الرف 80 كيلو',
      price: 3000,
      owner: 'أحمد حاتم',
      badge: '',
      isFavorite: true
    },
    {
      id: 7,
      title: 'شاشة العرض LED للإيجار للإعلان لوحات كاملة الألوان',
      image: 'ads7.png',
      description: 'رفوف كامله دهان كتروستاتيك معالج ضد الصدا حمولة الرف 80 كيلو',
      price: 7770,
      owner: 'عاصم عاصم',
      badge: '',
      isFavorite: true
    }
  ];

  //homeSlides2: CreatUpdtaeHomeSliderDto;
  constructor(
    private route: Router
  ) {
    super();
  }

  ngOnInit() {
  }

  addToFavorite(e, indx){
    e.stopPropagation();
    this.adsList[indx].isFavorite = !this.adsList[indx].isFavorite;
  }
}

