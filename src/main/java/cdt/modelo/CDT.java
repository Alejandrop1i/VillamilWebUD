/*
 * Autor: David Villamil
 * Asignatura: Programación Avanzada - Grupo 31
 * Universidad Distrital Francisco José de Caldas - 2026
 *
 * Modelo: CDT — Certificado de Depósito a Término.
 * Responsabilidad: contener los datos del CDT y la lógica de negocio
 * pura del cálculo (interés simple base 360 días + retención del 4%).
 * No depende de JSF/CDI: puede probarse aisladamente.
 */
package cdt.modelo;

import java.io.Serializable;
import java.time.LocalDateTime;

public class CDT implements Serializable {

    private static final long serialVersionUID = 1L;

    public static final double DIAS_ANIO_COMERCIAL = 360.0;
    public static final double TASA_RETENCION = 0.04; // 4% sobre el rendimiento

    private double inversion;
    private double interesPorcentaje;
    private int plazoDias;

    private double ganancia;
    private double valorFuturo;
    private double impuesto;
    private double gananciaNeta;
    private LocalDateTime fechaCalculo;

    public CDT() {
    }

    public CDT(double inversion, double interesPorcentaje, int plazoDias) {
        this.inversion = inversion;
        this.interesPorcentaje = interesPorcentaje;
        this.plazoDias = plazoDias;
    }

    public void calcular() {
        validar();
        double tasaDecimal = interesPorcentaje / 100.0;
        ganancia = inversion * tasaDecimal * (plazoDias / DIAS_ANIO_COMERCIAL);
        impuesto = ganancia * TASA_RETENCION;
        gananciaNeta = ganancia - impuesto;
        valorFuturo = inversion + gananciaNeta;
        fechaCalculo = LocalDateTime.now();
    }

    private void validar() {
        if (inversion <= 0) {
            throw new IllegalArgumentException("La inversión debe ser mayor que cero.");
        }
        if (interesPorcentaje <= 0 || interesPorcentaje > 100) {
            throw new IllegalArgumentException("El interés debe estar entre 0% y 100% E.A.");
        }
        if (plazoDias < 30 || plazoDias > 1800) {
            throw new IllegalArgumentException("El plazo debe estar entre 30 y 1800 días.");
        }
    }

    public double getInversion() { return inversion; }
    public void setInversion(double inversion) { this.inversion = inversion; }

    public double getInteresPorcentaje() { return interesPorcentaje; }
    public void setInteresPorcentaje(double interesPorcentaje) { this.interesPorcentaje = interesPorcentaje; }

    public int getPlazoDias() { return plazoDias; }
    public void setPlazoDias(int plazoDias) { this.plazoDias = plazoDias; }

    public double getGanancia() { return ganancia; }
    public double getValorFuturo() { return valorFuturo; }
    public double getImpuesto() { return impuesto; }
    public double getGananciaNeta() { return gananciaNeta; }
    public LocalDateTime getFechaCalculo() { return fechaCalculo; }
}
