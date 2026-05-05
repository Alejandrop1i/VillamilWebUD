/*
 * Autor: David Villamil
 * Asignatura: Programación Avanzada - Grupo 301
 * Bean JSF: AspiranteBean (controla el formulario de registro y el listado de aspirantes).
 */
package asp.bean;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;

import asp.modelo.Aspirante;
import asp.modelo.AspiranteDAO;
import asp.modelo.ProgAcad;
import asp.modelo.ProgAcadDAO;
import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.SessionScoped;
import jakarta.faces.application.FacesMessage;
import jakarta.faces.context.FacesContext;
import jakarta.inject.Named;

@Named("asp")
@SessionScoped
public class AspiranteBean implements Serializable {

	private static final long serialVersionUID = 1L;

	private Aspirante dto = new Aspirante();
	private ArrayList<Aspirante> listaAs = AspiranteDAO.lista_A;
	private ArrayList<ProgAcad> listaPa = ProgAcadDAO.lista_P;

	@PostConstruct
	public void init() {
		ProgAcadDAO.cargaDatos();
		listaPa = ProgAcadDAO.lista_P;
	}

	public Aspirante getDto() {
		return dto;
	}

	public void setDto(Aspirante dto) {
		this.dto = dto;
	}

	public ArrayList<Aspirante> getListaAs() {
		return listaAs;
	}

	public void setListaAs(ArrayList<Aspirante> listaAs) {
		this.listaAs = listaAs;
	}

	public ArrayList<ProgAcad> getListaPa() {
		return listaPa;
	}

	public void setListaPa(ArrayList<ProgAcad> listaPa) {
		this.listaPa = listaPa;
	}

	public String registrar() {
		FacesContext ctx = FacesContext.getCurrentInstance();

		if (AspiranteDAO.existeIdentificacion(dto.getId_p())) {
			ctx.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR,
					"Identificación duplicada",
					"Ya existe un aspirante registrado con esa identificación."));
			return null;
		}

		int idx = dto.getPro_acad().getCod();
		if (idx >= 0 && idx < listaPa.size()) {
			dto.setPro_acad(listaPa.get(idx));
		} else {
			ctx.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR,
					"Programa inválido",
					"Debe seleccionar un programa académico."));
			return null;
		}

		dto.setFecha_reg(LocalDate.now());
		AspiranteDAO.agregar(dto);

		ctx.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_INFO,
				"Registro exitoso",
				"Aspirante " + dto.getNombres() + " " + dto.getApellidos() + " registrado correctamente."));

		dto = new Aspirante();
		return null;
	}

	public String limpiar() {
		dto = new Aspirante();
		return null;
	}
	public int obtenerIndice(Object aspirante) {
	    return listaAs.indexOf(aspirante) + 1;
	}
}
