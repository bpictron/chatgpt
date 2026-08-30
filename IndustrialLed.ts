/**
 * ============================================================================
 * IndustrialLed.ts
 * ============================================================================
 *
 * Composant TypeScript autonome représentant un voyant LED industriel.
 *
 * Le composant :
 *   - crée automatiquement son HTML ;
 *   - injecte automatiquement son CSS ;
 *   - permet de modifier la couleur dynamiquement ;
 *   - peut être instancié plusieurs fois ;
 *   - n'injecte le CSS qu'une seule fois dans la page ;
 *   - ne nécessite aucune feuille CSS externe.
 *
 * Exemple :
 *
 *   import { IndustrialLed } from "./IndustrialLed";
 *
 *   const container = document.querySelector("#status-led");
 *
 *   if (container instanceof HTMLElement) {
 *     const led = new IndustrialLed(container, "green");
 *     led.color = "orange";
 *     led.turnOff();
 *   }
 *
 * ============================================================================
 */

export type LedColor = "off" | "green" | "orange" | "red";

export class IndustrialLed {
  /** Identifiant unique du bloc CSS injecté dans la page. */
  private static readonly STYLE_ID = "industrial-led-component-style";

  /** Élément extérieur représentant la bague métallique. */
  private readonly assembly: HTMLDivElement;

  /** Élément représentant la partie lumineuse de la LED. */
  private readonly ledElement: HTMLDivElement;

  /** Couleur actuellement affichée. */
  private currentColor: LedColor = "off";

  /**
   * Crée un nouveau voyant LED industriel.
   *
   * @param parent Élément HTML dans lequel le voyant doit être inséré.
   * @param initialColor Couleur initiale du voyant. Valeur par défaut : "off".
   */
  constructor(parent: HTMLElement, initialColor: LedColor = "off") {
    if (!(parent instanceof HTMLElement)) {
      throw new Error(
        "IndustrialLed : le parent fourni n'est pas un HTMLElement valide."
      );
    }

    IndustrialLed.installStyles();

    this.assembly = document.createElement("div");
    this.assembly.className = "industrial-led-assembly";

    this.ledElement = document.createElement("div");
    this.ledElement.className = "industrial-led";

    this.assembly.appendChild(this.ledElement);
    parent.appendChild(this.assembly);

    this.color = initialColor;
  }

  /** Modifie la couleur du voyant. Exemple : led.color = "green". */
  public set color(value: LedColor) {
    this.currentColor = value;
    this.ledElement.className = `industrial-led ${value}`;
  }

  /** Retourne la couleur actuellement sélectionnée. */
  public get color(): LedColor {
    return this.currentColor;
  }

  /** Change la couleur du voyant. Alternative à la propriété color. */
  public setColor(value: LedColor): void {
    this.color = value;
  }

  /** Éteint le voyant. */
  public turnOff(): void {
    this.color = "off";
  }

  /** Supprime complètement le voyant du DOM. */
  public remove(): void {
    this.assembly.remove();
  }

  /** Retourne l'élément HTML principal du composant. */
  public get element(): HTMLElement {
    return this.assembly;
  }

  /**
   * Installe automatiquement le CSS nécessaire au composant.
   * Le CSS n'est ajouté qu'une seule fois, quel que soit le nombre de LED.
   */
  private static installStyles(): void {
    if (document.getElementById(IndustrialLed.STYLE_ID)) {
      return;
    }

    const style = document.createElement("style");
    style.id = IndustrialLed.STYLE_ID;

    style.textContent = `
      /* Bague métallique extérieure */
      .industrial-led-assembly {
        width: 30px;
        height: 30px;
        display: inline-grid;
        place-items: center;
        position: relative;
        border-radius: 50%;
        vertical-align: middle;
        background: linear-gradient(
          145deg,
          #eef1f2 0%,
          #858b90 18%,
          #dfe3e5 35%,
          #5b6064 58%,
          #c9ced1 78%,
          #73797e 100%
        );
        box-shadow:
          0 2px 5px #000a,
          inset 0 1px 1px #fff,
          inset 0 -1px 2px #0008;
      }

      /* Joint sombre entre la bague métallique et la LED */
      .industrial-led-assembly::before {
        content: "";
        position: absolute;
        inset: 3px;
        border-radius: 50%;
        background: #090c0e;
        box-shadow:
          inset 0 1px 3px #000,
          inset 0 0 0 1px #ffffff10;
      }

      /* Partie lumineuse */
      .industrial-led {
        position: relative;
        z-index: 1;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        border: 1px solid #000a;
        transition:
          background 160ms ease,
          box-shadow 160ms ease,
          filter 160ms ease;
      }

      /* LED éteinte */
      .industrial-led.off {
        background: radial-gradient(
          circle at 34% 28%,
          #5b6066 0 8%,
          #31363a 28%,
          #171a1d 74%
        );
        box-shadow:
          inset 0 -4px 6px #000b,
          inset 0 2px 3px #ffffff12;
      }

      /* LED verte */
      .industrial-led.green {
        background: radial-gradient(
          circle at 34% 27%,
          #f2fff4 0 7%,
          #74ff9c 16%,
          #26d864 48%,
          #087d32 100%
        );
        box-shadow:
          inset 0 -4px 6px #00541a77,
          0 0 4px #20d060,
          0 0 9px #20d06099,
          0 0 16px #20d06033;
      }

      /* LED orange */
      .industrial-led.orange {
        background: radial-gradient(
          circle at 34% 27%,
          #fff8e8 0 7%,
          #ffd675 16%,
          #ff9f1c 48%,
          #9b4f00 100%
        );
        box-shadow:
          inset 0 -4px 6px #6f330077,
          0 0 4px #ff9f1c,
          0 0 9px #ff9f1c99,
          0 0 16px #ff9f1c33;
      }

      /* LED rouge */
      .industrial-led.red {
        background: radial-gradient(
          circle at 34% 27%,
          #fff0f0 0 7%,
          #ff807a 16%,
          #e53935 48%,
          #82110e 100%
        );
        box-shadow:
          inset 0 -4px 6px #64000077,
          0 0 4px #e53935,
          0 0 9px #e5393599,
          0 0 16px #e5393533;
      }
    `;

    document.head.appendChild(style);
  }
}
