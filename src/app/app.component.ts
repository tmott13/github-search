import { Component, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GitHubService } from './services/github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  title = 'github-search';
  search_results: any;
  search_string: "tmott";
  id: any;
  displayedColumns = ['id', 'login'];
  searchResults_dataSource = new MatTableDataSource();

  constructor(private githubservice: GitHubService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.githubservice.GetSearchResults(this.search_string).subscribe(data => {
      this.searchResults_dataSource.data = data.items;
    });
  }
  ngAfterViewInit() {

    this.searchResults_dataSource.paginator = this.paginator;
    this.searchResults_dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    this.searchResults_dataSource.filter = filterValue.trim().toLowerCase();

    if (this.searchResults_dataSource.paginator) {
      this.searchResults_dataSource.paginator.firstPage();
    }
  }
  search(searchValue: string) {
    this.githubservice.GetSearchResults(searchValue.trim()).subscribe(data => {
      this.searchResults_dataSource.data = data.items;
    }); 
  }
  popup(selectedRow: any): void {
    const dialogRef = this.dialog.open(GitHubDetailsDialog, {
      width: '550px',
      data: {login: selectedRow.login}
    });   
  }
}
export interface DialogData {
  login: string;
}
@Component({
  templateUrl: 'github-dialog.html',
})
export class GitHubDetailsDialog {
  searchDetails: any;
  constructor(
    private githubservice: GitHubService,
    public dialogRef: MatDialogRef<GitHubDetailsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
    this.githubservice.GetSearchDetails(this.data.login).subscribe(data => {
      this.searchDetails = data;
    });
  }
  close(): void {
    this.dialogRef.close();
  }
}