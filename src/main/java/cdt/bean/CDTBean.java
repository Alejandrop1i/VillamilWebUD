/*
 * Autor: David Villamil
 * Asignatura: Programación Avanzada - Grupo 31
 * Universidad Distrital Francisco José de Caldas - 2026
 *
 * Controlador (capa C de MVC): CDTBean.
 * Mediador entre la vista cdt.xhtml y el modelo cdt.modelo.CDT / SimulacionCDTDAO.
 * Captura las acciones del usuario, delega el cálculo en el modelo y publica
 * el estado para JSF.
 */
package cdt.bean;

import java.io.Serializable;
import java.util.List;

import cdt.modelo.CDT;
import cdt.modelo.SimulacionCDTDAO;
import jakarta.faces.application.FacesMessage;
import jakarta.faces.context.FacesContext;
import jakarta.faces.view.ViewScoped;
import jakarta.inject.Named;

@Named("cdt")
@ViewScoped
public class CDTBean implements Serializable {

    private static final long serialVersionUID = 1L;

    private CDT modelo = new CDT();
    private boolean calculado = false;

    public String calcular() {
        FacesContext ctx = FacesContext.getCurrentInstance();
        try {
            modelo.calcular();
            SimulacionCDTDAO.agregar(modelo);
            calculado = true;

            CDT siguiente = new CDT();
            siguiente.setInversion(modelo.getInversion());
            siguiente.setInteresPorcentaje(modelo.getInteresPorcentaje());
            siguiente.setPlazoDias(modelo.getPlazoDias());
            modelo = siguiente;

            ctx.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_INFO,
                    "Cálculo realizado",
                    "Simulación agregada al historial."));
        } catch (IllegalArgumentException ex) {
            calculado = false;
            ctx.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR,
                    "Datos inválidos", ex.getMessage()));
        }
        return null;
    }

    public String limpiar() {
        modelo = new CDT();
        calculado = false;
        return null;
    }

    public String limpiarHistorial() {
        SimulacionCDTDAO.limpiar();
        FacesContext.getCurrentInstance().addMessage(null,
                new FacesMessage(FacesMessage.SEVERITY_INFO,
                        "Historial limpiado",
                        "Se eliminaron todas las simulaciones almacenadas."));
        return null;
    }

    public CDT getModelo() {
        return modelo;
    }

    public void setModelo(CDT modelo) {
        this.modelo = modelo;
    }

    public boolean isCalculado() {
        return calculado;
    }

    public List<CDT> getHistorial() {
        return SimulacionCDTDAO.listar();
    }

    public int getTotalSimulaciones() {
        return SimulacionCDTDAO.total();
    }
}
