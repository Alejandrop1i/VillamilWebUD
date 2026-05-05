/*
 * Autor: David Villamil
 * Asignatura: Programación Avanzada - Grupo 31
 * Universidad Distrital Francisco José de Caldas - 2026
 *
 * DAO: SimulacionCDTDAO — almacenamiento en memoria del historial
 * de simulaciones del CDT. Persistencia simple por sesión (ArrayList).
 */
package cdt.modelo;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class SimulacionCDTDAO {

    public static final ArrayList<CDT> historial = new ArrayList<>();

    private SimulacionCDTDAO() { }

    public static void agregar(CDT cdt) {
        historial.add(0, cdt);
    }

    public static void limpiar() {
        historial.clear();
    }

    public static List<CDT> listar() {
        return Collections.unmodifiableList(historial);
    }

    public static int total() {
        return historial.size();
    }
}
