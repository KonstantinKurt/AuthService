import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Profile} from '../../Profile/profile-edit/model/profile.model';
import {ProfileEditService} from '../../Profile/profile-edit/profile-edit.service';
import {Article} from '../model/article.model';
import {MyArticleService} from './my-article.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-my-article',
    templateUrl: './my-article.component.html',
    styleUrls: [
        './my-article.component.scss',
        '../../Profile/profile-edit/profile-edit.component.scss',
        '../../shared/navbar/navbar.component.scss',
    ]
})
export class MyArticleComponent implements OnInit {
    private profile: Profile;
    private articles: Article[];
    private selectedArticle: Article;
    @ViewChild('articleContentRef', {static: false})
    articleContentRef: ElementRef;

    constructor(
        private profileEditService: ProfileEditService,
        private myArticleService: MyArticleService,
        private router: Router,
    ) {
        this.profile = new Profile();
    }

    ngOnInit() {
        this.getCurrentProfile();
        this.getAllProfileArticles();
    }

    async getCurrentProfile() {
        this.profileEditService.getCurrentProfile()
            .subscribe(
                (response: any) => {
                    this.profile = response.body.result;
                },
                (err) => {
                    console.log(err);
                });
    }

    async getAllProfileArticles() {
        this.myArticleService.getAllProfileArticles()
            .subscribe(
                (response: any) => {
                    console.log(response);
                    this.articles = response.body.result.sort((a, b) => {
                        return +(new Date(b.createdAt)) - +(new Date(a.createdAt));
                    });

                },
                (err) => {
                    console.log(err);
                });
    }

    async getArticleFromList(article: Article) {
        this.selectedArticle = article;
        alert(JSON.stringify(this.selectedArticle));
        console.log(this.articleContentRef);

    }

    async createArticle() {
        this.router.navigateByUrl('article/create');
    }

    async redirectToArticle() {

    }
}
