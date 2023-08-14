const alertaEditarAgregarError = (titulo,mensaje,tipoAlerta,url)=>{
	

	Swal.fire({
					  title: titulo,
					  text: mensaje,
					  icon: tipoAlerta,
					  confirmButtonColor: '#3085d6',
					  confirmButtonText: 'OK',
					 
					}).then(async (result) => {
			  			if (result.isConfirmed && url!="") {

			  					location.href=url


			  				}

			  			})


}

export {
	
	alertaEditarAgregarError

}