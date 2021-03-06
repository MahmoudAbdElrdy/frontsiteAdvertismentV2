import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/@core/Component/BaseComponent/BaseComponent';
import { StaticPageDto } from 'src/app/@AppService/models/static-page.model';

@Component({
  selector: 'app-privacypolicy',
  templateUrl: './privacypolicy.component.html',
  styleUrls: ['./privacypolicy.component.scss']
})
export class PrivacyPolicyComponent extends BaseComponent implements OnInit {
  privacyPolicyPage: StaticPageDto = {
    id: 1,
    pageName: 'سياسة الخصوصية',
    content: `<p>هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في
    الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى
    المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم
    إيبسوم لأنها تعطي توزيعاَ طبيعياَ هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي
    للنص أو شكل توضع الفقرات هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي
    للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ هناك حقيقة مثبتة منذ زمن
    طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها ولذلك يتم
    استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ
    عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي
    القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ
    طبيعياَ هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص</p>
    <br>
    <h3>أولا</h3>
    <p>هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في
    الصفحة التي يقرأها. ولذلك يتم استخدام طريقة</p>
    <br>
    <h3>ثانياً</h3>
    <p>هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في
    الصفحة التي يقرأها. ولذلك يتم استخدام طريقة</p>

    <br>
    <h3>ثالثاً</h3>
    <p>هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في
    الصفحة التي يقرأها. ولذلك يتم استخدام طريقة</p>
    
    `
  };

  constructor(private route: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }
  ngOnInit() {}


}
