/*
 * Autor: David Villamil
 * Asignatura: Programación Avanzada - Grupo 31
 * 
 */
package asp.modelo;

import java.util.ArrayList;

public class AspiranteDAO {

	public static ArrayList<Aspirante> lista_A = new ArrayList<Aspirante>();

	public static boolean existeIdentificacion(long id) {
		for (Aspirante a : lista_A) {
			if (a.getId_p() == id) {
				return true;
			}
		}
		return false;
	}

	public static void agregar(Aspirante a) {
		lista_A.add(a);
	}
}
