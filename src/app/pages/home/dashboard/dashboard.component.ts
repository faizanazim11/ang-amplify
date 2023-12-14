import { Component, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { DefaultResponse } from 'src/app/models/default-response';
import { EchoToasterService } from 'src/app/services/echo-toaster.service';
import { FormControl, FormGroup } from '@angular/forms';
import { CognitoService } from 'src/app/services/cognito.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public enableSidebar: any = false;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  addclass: any = false;
  public selectedFile: any;
  public uploadData: any = {
    fileSelectedToUpload: '',
    file_extension: '',
    isValid: false,
    fileNameBlock: '',
    csvUploadFile: '',
    file: null,
  };
  public uploadForm: any = new FormGroup({
    file: new FormControl(File),
    caption: new FormControl(''),
    description: new FormControl(''),
    tags: new FormControl(''),
  });
  public postDet: any = {}
  getAllPosts: any = [{
    "caption": "Test1",
    "description": "Testing",
    "tags": [
      "test"
    ],
    "post_id": "e2jpqVvz7Jo5GsTfjV6Mxf",
    "user_id": "TU2tnjjBRFCdMn64KGayLC",
    "object_url": "https://storage.googleapis.com/echo-connect-objects/e2jpqVvz7Jo5GsTfjV6Mxf.png",
    "created_at": "2023-01-12T08:39:48.252000",
    "updated_at": "2023-01-12T08:39:48.252000",
    "likes": 1,
    "user_profile": "",
    "user_name": ""
  },
  {
    "caption": "Test2",
    "description": "Testing",
    "tags": [
      "test"
    ],
    "post_id": "e2jpqVvz7Jo5GsTfjV6Mxf",
    "user_id": "TU2tnjjBRFCdMn64KGayLC",
    "object_url": "https://storage.googleapis.com/echo-connect-objects/e2jpqVvz7Jo5GsTfjV6Mxf.png",
    "created_at": "2023-01-12T08:39:48.252000",
    "updated_at": "2023-01-12T08:39:48.252000",
    "likes": 1,
    "user_profile": "",
    "user_name": ""
  }
  ];


  constructor(private echoToasterService: EchoToasterService, private modalService: NgbModal, private cognitoService: CognitoService) { }
  public openDropdown: any = false
  ngOnInit() {
    this.loadPost();
  }

  loadPost() {
  }

  openSidebar() {
    this.enableSidebar = !this.enableSidebar
  }

  open(content: any) {
    this.modalService.open(content);
  }

  logout() {
    this.cognitoService.handleLogout();
  }

  toggleDOMELM(referenceId: string) {
    try {
      const domEle = document.getElementById(referenceId);
      if (domEle) {
        domEle.click();
      }
    } catch (error) {
      console.error(error);
    }
  }


  uploadFile() {
  }

  closeModal() {

  }
}
