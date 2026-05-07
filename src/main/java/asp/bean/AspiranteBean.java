/*
 * Autor: David Villamil
 * Asignatura: Programación Avanzada - Grupo 301
 * Bean JSF: AspiranteBean (controla el formulario de registro y el listado de aspirantes).
 */
package asp.bean;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.primefaces.model.charts.ChartData;
import org.primefaces.model.charts.pie.PieChartDataSet;
import org.primefaces.model.charts.pie.PieChartModel;

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
	private Aspirante seleccionado;
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

	/**
	 * Acción usada por el botón "Ver detalle" de la tabla en admin.xhtml.
	 * Guarda el aspirante seleccionado para que el p:dialog lo muestre.
	 */
	public void verDetalle(Aspirante aspirante) {
		this.seleccionado = aspirante;
	}

	public Aspirante getSeleccionado() {
		return seleccionado;
	}

	public void setSeleccionado(Aspirante seleccionado) {
		this.seleccionado = seleccionado;
	}

	/**
	 * Modelo de datos para p:chart (gráfica de torta).
	 * Cuenta cuántos aspirantes hay por cada programa académico.
	 */
	public PieChartModel getGraficaPrograma() {
		PieChartModel model = new PieChartModel();
		ChartData data = new ChartData();
		PieChartDataSet ds = new PieChartDataSet();

		Map<String, Integer> conteo = new LinkedHashMap<>();
		for (Aspirante a : listaAs) {
			String prog = (a.getPro_acad() != null && a.getPro_acad().getNombre_prog() != null)
					? a.getPro_acad().getNombre_prog()
					: "Sin programa";
			conteo.merge(prog, 1, Integer::sum);
		}

		List<Number> valores = new ArrayList<>();
		List<String> etiquetas = new ArrayList<>();
		for (Map.Entry<String, Integer> e : conteo.entrySet()) {
			etiquetas.add(e.getKey());
			valores.add(e.getValue());
		}

		List<String> colores = Arrays.asList(
				"#092b5a", "#09738a", "#78a890", "#e7d9b4",
				"#9ed1b7", "#5b8aa6", "#c97b63", "#6c8ebf");

		ds.setData(valores);
		ds.setBackgroundColor(colores);
		data.addChartDataSet(ds);
		data.setLabels(etiquetas);

		model.setData(data);
		return model;
	}

	public boolean isHayAspirantes() {
		return listaAs != null && !listaAs.isEmpty();
	}
}
