import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from 'src/app/component/template/confirm-delete/confirm-delete.component';
import { Hospedagem } from 'src/app/model/hospedagem.model';
import { HospedagemService } from 'src/app/service/hospedagem.service';

@Component({
  selector: 'app-hospedagem-list',
  templateUrl: './hospedagem-list.component.html',
  styleUrls: ['./hospedagem-list.component.css']
})
export class HospedagemListComponent implements OnInit {
  
  hospedagens: Hospedagem[] = [];
  displayedColumns: string[] = ['id', 'quarto', 'hospede', 'dtCheckin', 'dtCheckout', 'acao'];

  constructor(
    private service: HospedagemService,
    private dialog: MatDialog
  ) { }

  atualizarDados(): void{
    this.service.findAll().subscribe( hospedagens => {
      this.hospedagens = hospedagens;
    })
  }

  ngOnInit(): void {
    this.atualizarDados();
  }

  excluir(hospedagem: Hospedagem): void{

    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {
        message: `Deseja realmente excluir a hospedagem ${hospedagem.idHospedagem}?`,
        buttonText:{
          ok: 'Excluir',
          cancel: 'Desistir'
        }
      }
    })

    dialogRef.afterClosed().subscribe((confirm: boolean) =>{
      if(confirm){
        this.service.delete(hospedagem).subscribe(() =>{
          this.service.showMessage("Hospedagem excluida com sucesso!");
          this.atualizarDados();
        })
      }
    })
  }

}