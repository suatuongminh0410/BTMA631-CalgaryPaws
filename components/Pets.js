// Original dog and cat drawings used around the site.
// They are decorative, so screen readers skip them (aria-hidden). Colours live in globals.css.

function DogShape() {
  return (
    <>
      <ellipse cx="20" cy="52" rx="11" ry="22" transform="rotate(14 20 52)" className="pet-dog-ear" />
      <ellipse cx="80" cy="52" rx="11" ry="22" transform="rotate(-14 80 52)" className="pet-dog-ear" />
      <ellipse cx="50" cy="55" rx="31" ry="28" className="pet-dog-fur" />
      <ellipse cx="63" cy="49" rx="9" ry="8.5" className="pet-dog-ear" />
      <ellipse cx="50" cy="68" rx="17" ry="13" className="pet-muzzle" />
      <circle cx="38" cy="49" r="4.2" className="pet-eye" />
      <circle cx="62" cy="49" r="4.2" className="pet-eye" />
      <circle cx="39.5" cy="47.5" r="1.4" className="pet-shine" />
      <circle cx="63.5" cy="47.5" r="1.4" className="pet-shine" />
      <ellipse cx="50" cy="61" rx="6.5" ry="4.6" className="pet-nose" />
      <ellipse cx="50" cy="77" rx="4.2" ry="4.8" className="pet-tongue" />
      <path d="M50 65.5 v5 M50 70.5 q-5 5 -10 1 M50 70.5 q5 5 10 1" className="pet-line" />
    </>
  );
}

function CatShape() {
  return (
    <>
      <path d="M17 44 L22 9 L47 27 Z" className="pet-cat-fur" />
      <path d="M83 44 L78 9 L53 27 Z" className="pet-cat-fur" />
      <path d="M24 33 L26 18 L38 27 Z" className="pet-inner-ear" />
      <path d="M76 33 L74 18 L62 27 Z" className="pet-inner-ear" />
      <ellipse cx="50" cy="58" rx="33" ry="27" className="pet-cat-fur" />
      <path d="M50 33 v9 M41 34.5 l2.5 7.5 M59 34.5 l-2.5 7.5" className="pet-stripe" />
      <ellipse cx="36" cy="56" rx="4.6" ry="5.4" className="pet-eye" />
      <ellipse cx="64" cy="56" rx="4.6" ry="5.4" className="pet-eye" />
      <circle cx="37.6" cy="54" r="1.6" className="pet-shine" />
      <circle cx="65.6" cy="54" r="1.6" className="pet-shine" />
      <path d="M46 64 h8 l-4 5 Z" className="pet-cat-nose" />
      <path d="M50 69 q-4 5 -9 2 M50 69 q4 5 9 2" className="pet-line" />
      <path d="M18 60 h13 M19 67 l12 -4 M82 60 h-13 M81 67 l-12 -4" className="pet-whisker" />
    </>
  );
}

export function DogFace({ size = 24, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
      <DogShape />
    </svg>
  );
}

export function CatFace({ size = 24, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
      <CatShape />
    </svg>
  );
}

// Shows a dog or cat face for a species value; anything else shows nothing.
export function SpeciesIcon({ species, size = 22 }) {
  if (species === "Dog") return <DogFace size={size} />;
  if (species === "Cat") return <CatFace size={size} />;
  return null;
}

export function Paw({ size = 20, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="currentColor" aria-hidden="true" focusable="false">
      <ellipse cx="50" cy="68" rx="23" ry="18" />
      <ellipse cx="19" cy="46" rx="8.5" ry="11" transform="rotate(-22 19 46)" />
      <ellipse cx="37" cy="26" rx="8.5" ry="11.5" transform="rotate(-7 37 26)" />
      <ellipse cx="63" cy="26" rx="8.5" ry="11.5" transform="rotate(7 63 26)" />
      <ellipse cx="81" cy="46" rx="8.5" ry="11" transform="rotate(22 81 46)" />
    </svg>
  );
}

// Home page picture: a dog and a cat peeking over a ledge.
export function PetPair({ className = "" }) {
  return (
    <svg viewBox="0 0 270 140" className={className} aria-hidden="true" focusable="false">
      <g transform="translate(14 18) scale(1.2)">
        <DogShape />
      </g>
      <g transform="translate(134 18) scale(1.2)">
        <CatShape />
      </g>
      <rect x="6" y="112" width="258" height="16" rx="8" className="pet-ledge" />
    </svg>
  );
}
