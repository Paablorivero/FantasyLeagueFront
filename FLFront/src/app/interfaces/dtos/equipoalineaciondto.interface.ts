// Este es un dto que devuelve la alineación del equipo de un usuario para una jornada determinada.
// Acordarse que devuelve un Array.

export interface Equipoalineaciondto {
  equipoId: string;
  jugadorId: number;
  jornadaId: number;
  puntuacion: number;
  Jugador: JugadorResumenDto;
}

interface JugadorResumenDto {
  jugadorId: number;
  nombre: string;
  posicion: string;
  foto: string;
}
