import {Component, OnInit, ViewChild} from '@angular/core';
import {Profile} from '../../Profile/profile-edit/model/profile.model';
import {ProfileEditService} from '../../Profile/profile-edit/profile-edit.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ckeEditorConfig} from '../../_helpers/ckeditor-config';
import {Article} from '../model/article.model';
import {ChangeEvent, CKEditorComponent} from '@ckeditor/ckeditor5-angular';

@Component({
    selector: 'app-create-article',
    templateUrl: './create-article.component.html',
    styleUrls: [
        './create-article.component.scss',
        '../../Profile/profile-edit/profile-edit.component.scss',
        '../../common/navbar/navbar.component.scss',
    ]
})
export class CreateArticleComponent implements OnInit {
    private profile: Profile;
    article: Article;
    private Editor = ClassicEditor;
    private editorConfig = ckeEditorConfig;

    @ViewChild('editor', {static: false})
    editorComponent: CKEditorComponent;

    constructor(
        private profileEditService: ProfileEditService,
    ) {
        this.profile = new Profile();
        this.article = new Article();
    }

    ngOnInit() {
        this.getCurrentProfile();
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

    async onChange({editor}: ChangeEvent) {
        this.article.content = editor.getData();
    }

    createArticle() {
       console.log(this.editorComponent.editorInstance);

    }

}
