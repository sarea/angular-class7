import {Component, Input, Output, EventEmitter} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-basic',
  templateUrl: 'delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {

  constructor(private modalService: NgbModal) {}

  @Input() indexToInput;

  @Output() indexToOutput: EventEmitter<number> = new EventEmitter<number>();

  agreement() {
    this.indexToOutput.emit(this.indexToInput)
  }
  open(content) {
    this.modalService.open(content).result
  }
}
