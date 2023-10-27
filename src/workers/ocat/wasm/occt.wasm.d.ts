export declare class TopExp_Explorer {
  Init(S: TopoDS_Shape, ToFind: TopAbs_ShapeEnum, ToAvoid: TopAbs_ShapeEnum): void;
  More(): Standard_Boolean;
  Next(): void;
  Value(): TopoDS_Shape;
  Current(): TopoDS_Shape;
  ReInit(): void;
  ExploredShape(): TopoDS_Shape;
  Depth(): Graphic3d_ZLayerId;
  Clear(): void;
  delete(): void;
}

export declare class TopExp_Explorer_1 extends TopExp_Explorer {
  constructor();
}

export declare class TopExp_Explorer_2 extends TopExp_Explorer {
  constructor(S: TopoDS_Shape, ToFind: TopAbs_ShapeEnum, ToAvoid: TopAbs_ShapeEnum);
}

export declare class BRepBndLib {
  constructor();
  static Add(S: TopoDS_Shape, B: Bnd_Box, useTriangulation: Standard_Boolean): void;
  static AddClose(S: TopoDS_Shape, B: Bnd_Box): void;
  static AddOptimal(
    S: TopoDS_Shape,
    B: Bnd_Box,
    useTriangulation: Standard_Boolean,
    useShapeTolerance: Standard_Boolean
  ): void;
  static AddOBB(
    theS: TopoDS_Shape,
    theOBB: Bnd_OBB,
    theIsTriangulationUsed: Standard_Boolean,
    theIsOptimal: Standard_Boolean,
    theIsShapeToleranceUsed: Standard_Boolean
  ): void;
  delete(): void;
}

export declare class Handle_Geom_Surface {
  Nullify(): void;
  IsNull(): boolean;
  reset(thePtr: Geom_Surface): void;
  get(): Geom_Surface;
  delete(): void;
}

export declare class Handle_Geom_Surface_1 extends Handle_Geom_Surface {
  constructor();
}

export declare class Handle_Geom_Surface_2 extends Handle_Geom_Surface {
  constructor(thePtr: Geom_Surface);
}

export declare class Handle_Geom_Surface_3 extends Handle_Geom_Surface {
  constructor(theHandle: Handle_Geom_Surface);
}

export declare class Handle_Geom_Surface_4 extends Handle_Geom_Surface {
  constructor(theHandle: Handle_Geom_Surface);
}

export declare class Geom_Surface extends Geom_Geometry {
  UReverse(): void;
  UReversed(): Handle_Geom_Surface;
  UReversedParameter(U: Standard_Real): Standard_Real;
  VReverse(): void;
  VReversed(): Handle_Geom_Surface;
  VReversedParameter(V: Standard_Real): Standard_Real;
  TransformParameters(U: Standard_Real, V: Standard_Real, T: gp_Trsf): void;
  ParametricTransformation(T: gp_Trsf): gp_GTrsf2d;
  Bounds(U1: Standard_Real, U2: Standard_Real, V1: Standard_Real, V2: Standard_Real): void;
  IsUClosed(): Standard_Boolean;
  IsVClosed(): Standard_Boolean;
  IsUPeriodic(): Standard_Boolean;
  UPeriod(): Standard_Real;
  IsVPeriodic(): Standard_Boolean;
  VPeriod(): Standard_Real;
  UIso(U: Standard_Real): Handle_Geom_Curve;
  VIso(V: Standard_Real): Handle_Geom_Curve;
  Continuity(): GeomAbs_Shape;
  IsCNu(N: Graphic3d_ZLayerId): Standard_Boolean;
  IsCNv(N: Graphic3d_ZLayerId): Standard_Boolean;
  D0(U: Standard_Real, V: Standard_Real, P: gp_Pnt): void;
  D1(U: Standard_Real, V: Standard_Real, P: gp_Pnt, D1U: gp_Vec, D1V: gp_Vec): void;
  D2(
    U: Standard_Real,
    V: Standard_Real,
    P: gp_Pnt,
    D1U: gp_Vec,
    D1V: gp_Vec,
    D2U: gp_Vec,
    D2V: gp_Vec,
    D2UV: gp_Vec
  ): void;
  D3(
    U: Standard_Real,
    V: Standard_Real,
    P: gp_Pnt,
    D1U: gp_Vec,
    D1V: gp_Vec,
    D2U: gp_Vec,
    D2V: gp_Vec,
    D2UV: gp_Vec,
    D3U: gp_Vec,
    D3V: gp_Vec,
    D3UUV: gp_Vec,
    D3UVV: gp_Vec
  ): void;
  DN(U: Standard_Real, V: Standard_Real, Nu: Graphic3d_ZLayerId, Nv: Graphic3d_ZLayerId): gp_Vec;
  Value(U: Standard_Real, V: Standard_Real): gp_Pnt;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

export declare class Geom_Geometry extends Standard_Transient {
  Mirror_1(P: gp_Pnt): void;
  Mirror_2(A1: gp_Ax1): void;
  Mirror_3(A2: gp_Ax2): void;
  Rotate(A1: gp_Ax1, Ang: Standard_Real): void;
  Scale(P: gp_Pnt, S: Standard_Real): void;
  Translate_1(V: gp_Vec): void;
  Translate_2(P1: gp_Pnt, P2: gp_Pnt): void;
  Transform(T: gp_Trsf): void;
  Mirrored_1(P: gp_Pnt): Handle_Geom_Geometry;
  Mirrored_2(A1: gp_Ax1): Handle_Geom_Geometry;
  Mirrored_3(A2: gp_Ax2): Handle_Geom_Geometry;
  Rotated(A1: gp_Ax1, Ang: Standard_Real): Handle_Geom_Geometry;
  Scaled(P: gp_Pnt, S: Standard_Real): Handle_Geom_Geometry;
  Transformed(T: gp_Trsf): Handle_Geom_Geometry;
  Translated_1(V: gp_Vec): Handle_Geom_Geometry;
  Translated_2(P1: gp_Pnt, P2: gp_Pnt): Handle_Geom_Geometry;
  Copy(): Handle_Geom_Geometry;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

export declare class Handle_Geom_Curve {
  Nullify(): void;
  IsNull(): boolean;
  reset(thePtr: Geom_Curve): void;
  get(): Geom_Curve;
  delete(): void;
}

export declare class Handle_Geom_Curve_1 extends Handle_Geom_Curve {
  constructor();
}

export declare class Handle_Geom_Curve_2 extends Handle_Geom_Curve {
  constructor(thePtr: Geom_Curve);
}

export declare class Handle_Geom_Curve_3 extends Handle_Geom_Curve {
  constructor(theHandle: Handle_Geom_Curve);
}

export declare class Handle_Geom_Curve_4 extends Handle_Geom_Curve {
  constructor(theHandle: Handle_Geom_Curve);
}

export declare class Geom_Curve extends Geom_Geometry {
  Reverse(): void;
  ReversedParameter(U: Standard_Real): Standard_Real;
  TransformedParameter(U: Standard_Real, T: gp_Trsf): Standard_Real;
  ParametricTransformation(T: gp_Trsf): Standard_Real;
  Reversed(): Handle_Geom_Curve;
  FirstParameter(): Standard_Real;
  LastParameter(): Standard_Real;
  IsClosed(): Standard_Boolean;
  IsPeriodic(): Standard_Boolean;
  Period(): Standard_Real;
  Continuity(): GeomAbs_Shape;
  IsCN(N: Graphic3d_ZLayerId): Standard_Boolean;
  D0(U: Standard_Real, P: gp_Pnt): void;
  D1(U: Standard_Real, P: gp_Pnt, V1: gp_Vec): void;
  D2(U: Standard_Real, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec): void;
  D3(U: Standard_Real, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec, V3: gp_Vec): void;
  DN(U: Standard_Real, N: Graphic3d_ZLayerId): gp_Vec;
  Value(U: Standard_Real): gp_Pnt;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

export declare class BRep_Builder extends TopoDS_Builder {
  constructor();
  MakeFace_1(F: TopoDS_Face): void;
  MakeFace_2(F: TopoDS_Face, S: Handle_Geom_Surface, Tol: Standard_Real): void;
  MakeFace_3(F: TopoDS_Face, S: Handle_Geom_Surface, L: TopLoc_Location, Tol: Standard_Real): void;
  MakeFace_4(theFace: TopoDS_Face, theTriangulation: Handle_Poly_Triangulation): void;
  MakeFace_5(
    theFace: TopoDS_Face,
    theTriangulations: Poly_ListOfTriangulation,
    theActiveTriangulation: Handle_Poly_Triangulation
  ): void;
  UpdateFace_1(
    F: TopoDS_Face,
    S: Handle_Geom_Surface,
    L: TopLoc_Location,
    Tol: Standard_Real
  ): void;
  UpdateFace_2(
    theFace: TopoDS_Face,
    theTriangulation: Handle_Poly_Triangulation,
    theToReset: Standard_Boolean
  ): void;
  UpdateFace_3(F: TopoDS_Face, Tol: Standard_Real): void;
  NaturalRestriction(F: TopoDS_Face, N: Standard_Boolean): void;
  MakeEdge_1(E: TopoDS_Edge): void;
  MakeEdge_2(E: TopoDS_Edge, C: Handle_Geom_Curve, Tol: Standard_Real): void;
  MakeEdge_3(E: TopoDS_Edge, C: Handle_Geom_Curve, L: TopLoc_Location, Tol: Standard_Real): void;
  MakeEdge_4(E: TopoDS_Edge, P: Handle_Poly_Polygon3D): void;
  MakeEdge_5(
    E: TopoDS_Edge,
    N: Handle_Poly_PolygonOnTriangulation,
    T: Handle_Poly_Triangulation
  ): void;
  MakeEdge_6(
    E: TopoDS_Edge,
    N: Handle_Poly_PolygonOnTriangulation,
    T: Handle_Poly_Triangulation,
    L: TopLoc_Location
  ): void;
  UpdateEdge_1(E: TopoDS_Edge, C: Handle_Geom_Curve, Tol: Standard_Real): void;
  UpdateEdge_2(E: TopoDS_Edge, C: Handle_Geom_Curve, L: TopLoc_Location, Tol: Standard_Real): void;
  UpdateEdge_3(E: TopoDS_Edge, C: Handle_Geom2d_Curve, F: TopoDS_Face, Tol: Standard_Real): void;
  UpdateEdge_4(
    E: TopoDS_Edge,
    C1: Handle_Geom2d_Curve,
    C2: Handle_Geom2d_Curve,
    F: TopoDS_Face,
    Tol: Standard_Real
  ): void;
  UpdateEdge_5(
    E: TopoDS_Edge,
    C: Handle_Geom2d_Curve,
    S: Handle_Geom_Surface,
    L: TopLoc_Location,
    Tol: Standard_Real
  ): void;
  UpdateEdge_6(
    E: TopoDS_Edge,
    C: Handle_Geom2d_Curve,
    S: Handle_Geom_Surface,
    L: TopLoc_Location,
    Tol: Standard_Real,
    Pf: gp_Pnt2d,
    Pl: gp_Pnt2d
  ): void;
  UpdateEdge_7(
    E: TopoDS_Edge,
    C1: Handle_Geom2d_Curve,
    C2: Handle_Geom2d_Curve,
    S: Handle_Geom_Surface,
    L: TopLoc_Location,
    Tol: Standard_Real
  ): void;
  UpdateEdge_8(
    E: TopoDS_Edge,
    C1: Handle_Geom2d_Curve,
    C2: Handle_Geom2d_Curve,
    S: Handle_Geom_Surface,
    L: TopLoc_Location,
    Tol: Standard_Real,
    Pf: gp_Pnt2d,
    Pl: gp_Pnt2d
  ): void;
  UpdateEdge_9(E: TopoDS_Edge, P: Handle_Poly_Polygon3D): void;
  UpdateEdge_10(E: TopoDS_Edge, P: Handle_Poly_Polygon3D, L: TopLoc_Location): void;
  UpdateEdge_11(
    E: TopoDS_Edge,
    N: Handle_Poly_PolygonOnTriangulation,
    T: Handle_Poly_Triangulation
  ): void;
  UpdateEdge_12(
    E: TopoDS_Edge,
    N: Handle_Poly_PolygonOnTriangulation,
    T: Handle_Poly_Triangulation,
    L: TopLoc_Location
  ): void;
  UpdateEdge_13(
    E: TopoDS_Edge,
    N1: Handle_Poly_PolygonOnTriangulation,
    N2: Handle_Poly_PolygonOnTriangulation,
    T: Handle_Poly_Triangulation
  ): void;
  UpdateEdge_14(
    E: TopoDS_Edge,
    N1: Handle_Poly_PolygonOnTriangulation,
    N2: Handle_Poly_PolygonOnTriangulation,
    T: Handle_Poly_Triangulation,
    L: TopLoc_Location
  ): void;
  UpdateEdge_15(E: TopoDS_Edge, P: Handle_Poly_Polygon2D, S: TopoDS_Face): void;
  UpdateEdge_16(
    E: TopoDS_Edge,
    P: Handle_Poly_Polygon2D,
    S: Handle_Geom_Surface,
    T: TopLoc_Location
  ): void;
  UpdateEdge_17(
    E: TopoDS_Edge,
    P1: Handle_Poly_Polygon2D,
    P2: Handle_Poly_Polygon2D,
    S: TopoDS_Face
  ): void;
  UpdateEdge_18(
    E: TopoDS_Edge,
    P1: Handle_Poly_Polygon2D,
    P2: Handle_Poly_Polygon2D,
    S: Handle_Geom_Surface,
    L: TopLoc_Location
  ): void;
  UpdateEdge_19(E: TopoDS_Edge, Tol: Standard_Real): void;
  Continuity_1(E: TopoDS_Edge, F1: TopoDS_Face, F2: TopoDS_Face, C: GeomAbs_Shape): void;
  Continuity_2(
    E: TopoDS_Edge,
    S1: Handle_Geom_Surface,
    S2: Handle_Geom_Surface,
    L1: TopLoc_Location,
    L2: TopLoc_Location,
    C: GeomAbs_Shape
  ): void;
  SameParameter(E: TopoDS_Edge, S: Standard_Boolean): void;
  SameRange(E: TopoDS_Edge, S: Standard_Boolean): void;
  Degenerated(E: TopoDS_Edge, D: Standard_Boolean): void;
  Range_1(
    E: TopoDS_Edge,
    First: Standard_Real,
    Last: Standard_Real,
    Only3d: Standard_Boolean
  ): void;
  Range_2(
    E: TopoDS_Edge,
    S: Handle_Geom_Surface,
    L: TopLoc_Location,
    First: Standard_Real,
    Last: Standard_Real
  ): void;
  Range_3(E: TopoDS_Edge, F: TopoDS_Face, First: Standard_Real, Last: Standard_Real): void;
  Transfert_1(Ein: TopoDS_Edge, Eout: TopoDS_Edge): void;
  MakeVertex_1(V: TopoDS_Vertex): void;
  MakeVertex_2(V: TopoDS_Vertex, P: gp_Pnt, Tol: Standard_Real): void;
  UpdateVertex_1(V: TopoDS_Vertex, P: gp_Pnt, Tol: Standard_Real): void;
  UpdateVertex_2(V: TopoDS_Vertex, P: Standard_Real, E: TopoDS_Edge, Tol: Standard_Real): void;
  UpdateVertex_3(
    V: TopoDS_Vertex,
    P: Standard_Real,
    E: TopoDS_Edge,
    F: TopoDS_Face,
    Tol: Standard_Real
  ): void;
  UpdateVertex_4(
    V: TopoDS_Vertex,
    P: Standard_Real,
    E: TopoDS_Edge,
    S: Handle_Geom_Surface,
    L: TopLoc_Location,
    Tol: Standard_Real
  ): void;
  UpdateVertex_5(
    Ve: TopoDS_Vertex,
    U: Standard_Real,
    V: Standard_Real,
    F: TopoDS_Face,
    Tol: Standard_Real
  ): void;
  UpdateVertex_6(V: TopoDS_Vertex, Tol: Standard_Real): void;
  Transfert_2(Ein: TopoDS_Edge, Eout: TopoDS_Edge, Vin: TopoDS_Vertex, Vout: TopoDS_Vertex): void;
  delete(): void;
}

export declare class BRep_Tool {
  constructor();
  static IsClosed_1(S: TopoDS_Shape): Standard_Boolean;
  static Surface_1(F: TopoDS_Face, L: TopLoc_Location): Handle_Geom_Surface;
  static Surface_2(F: TopoDS_Face): Handle_Geom_Surface;
  static Triangulation(
    theFace: TopoDS_Face,
    theLocation: TopLoc_Location,
    theMeshPurpose: Poly_MeshPurpose
  ): Handle_Poly_Triangulation;
  static Triangulations(
    theFace: TopoDS_Face,
    theLocation: TopLoc_Location
  ): Poly_ListOfTriangulation;
  static Tolerance_1(F: TopoDS_Face): Standard_Real;
  static NaturalRestriction(F: TopoDS_Face): Standard_Boolean;
  static IsGeometric_1(F: TopoDS_Face): Standard_Boolean;
  static IsGeometric_2(E: TopoDS_Edge): Standard_Boolean;
  static Curve_1(
    E: TopoDS_Edge,
    L: TopLoc_Location,
    First: Standard_Real,
    Last: Standard_Real
  ): Handle_Geom_Curve;
  static Curve_2(E: TopoDS_Edge, First: Standard_Real, Last: Standard_Real): Handle_Geom_Curve;
  static Polygon3D(E: TopoDS_Edge, L: TopLoc_Location): Handle_Poly_Polygon3D;
  static CurveOnSurface_1(
    E: TopoDS_Edge,
    F: TopoDS_Face,
    First: Standard_Real,
    Last: Standard_Real,
    theIsStored: Standard_Boolean
  ): Handle_Geom2d_Curve;
  static CurveOnSurface_2(
    E: TopoDS_Edge,
    S: Handle_Geom_Surface,
    L: TopLoc_Location,
    First: Standard_Real,
    Last: Standard_Real,
    theIsStored: Standard_Boolean
  ): Handle_Geom2d_Curve;
  static CurveOnPlane(
    E: TopoDS_Edge,
    S: Handle_Geom_Surface,
    L: TopLoc_Location,
    First: Standard_Real,
    Last: Standard_Real
  ): Handle_Geom2d_Curve;
  static CurveOnSurface_3(
    E: TopoDS_Edge,
    C: Handle_Geom2d_Curve,
    S: Handle_Geom_Surface,
    L: TopLoc_Location,
    First: Standard_Real,
    Last: Standard_Real
  ): void;
  static CurveOnSurface_4(
    E: TopoDS_Edge,
    C: Handle_Geom2d_Curve,
    S: Handle_Geom_Surface,
    L: TopLoc_Location,
    First: Standard_Real,
    Last: Standard_Real,
    Index: Graphic3d_ZLayerId
  ): void;
  static PolygonOnSurface_1(E: TopoDS_Edge, F: TopoDS_Face): Handle_Poly_Polygon2D;
  static PolygonOnSurface_2(
    E: TopoDS_Edge,
    S: Handle_Geom_Surface,
    L: TopLoc_Location
  ): Handle_Poly_Polygon2D;
  static PolygonOnSurface_3(
    E: TopoDS_Edge,
    C: Handle_Poly_Polygon2D,
    S: Handle_Geom_Surface,
    L: TopLoc_Location
  ): void;
  static PolygonOnSurface_4(
    E: TopoDS_Edge,
    C: Handle_Poly_Polygon2D,
    S: Handle_Geom_Surface,
    L: TopLoc_Location,
    Index: Graphic3d_ZLayerId
  ): void;
  static PolygonOnTriangulation_1(
    E: TopoDS_Edge,
    T: Handle_Poly_Triangulation,
    L: TopLoc_Location
  ): Handle_Poly_PolygonOnTriangulation;
  static PolygonOnTriangulation_2(
    E: TopoDS_Edge,
    P: Handle_Poly_PolygonOnTriangulation,
    T: Handle_Poly_Triangulation,
    L: TopLoc_Location
  ): void;
  static PolygonOnTriangulation_3(
    E: TopoDS_Edge,
    P: Handle_Poly_PolygonOnTriangulation,
    T: Handle_Poly_Triangulation,
    L: TopLoc_Location,
    Index: Graphic3d_ZLayerId
  ): void;
  static IsClosed_2(E: TopoDS_Edge, F: TopoDS_Face): Standard_Boolean;
  static IsClosed_3(E: TopoDS_Edge, S: Handle_Geom_Surface, L: TopLoc_Location): Standard_Boolean;
  static IsClosed_4(
    E: TopoDS_Edge,
    T: Handle_Poly_Triangulation,
    L: TopLoc_Location
  ): Standard_Boolean;
  static Tolerance_2(E: TopoDS_Edge): Standard_Real;
  static SameParameter(E: TopoDS_Edge): Standard_Boolean;
  static SameRange(E: TopoDS_Edge): Standard_Boolean;
  static Degenerated(E: TopoDS_Edge): Standard_Boolean;
  static Range_1(E: TopoDS_Edge, First: Standard_Real, Last: Standard_Real): void;
  static Range_2(
    E: TopoDS_Edge,
    S: Handle_Geom_Surface,
    L: TopLoc_Location,
    First: Standard_Real,
    Last: Standard_Real
  ): void;
  static Range_3(E: TopoDS_Edge, F: TopoDS_Face, First: Standard_Real, Last: Standard_Real): void;
  static UVPoints_1(
    E: TopoDS_Edge,
    S: Handle_Geom_Surface,
    L: TopLoc_Location,
    PFirst: gp_Pnt2d,
    PLast: gp_Pnt2d
  ): void;
  static UVPoints_2(E: TopoDS_Edge, F: TopoDS_Face, PFirst: gp_Pnt2d, PLast: gp_Pnt2d): void;
  static SetUVPoints_1(
    E: TopoDS_Edge,
    S: Handle_Geom_Surface,
    L: TopLoc_Location,
    PFirst: gp_Pnt2d,
    PLast: gp_Pnt2d
  ): void;
  static SetUVPoints_2(E: TopoDS_Edge, F: TopoDS_Face, PFirst: gp_Pnt2d, PLast: gp_Pnt2d): void;
  static HasContinuity_1(E: TopoDS_Edge, F1: TopoDS_Face, F2: TopoDS_Face): Standard_Boolean;
  static Continuity_1(E: TopoDS_Edge, F1: TopoDS_Face, F2: TopoDS_Face): GeomAbs_Shape;
  static HasContinuity_2(
    E: TopoDS_Edge,
    S1: Handle_Geom_Surface,
    S2: Handle_Geom_Surface,
    L1: TopLoc_Location,
    L2: TopLoc_Location
  ): Standard_Boolean;
  static Continuity_2(
    E: TopoDS_Edge,
    S1: Handle_Geom_Surface,
    S2: Handle_Geom_Surface,
    L1: TopLoc_Location,
    L2: TopLoc_Location
  ): GeomAbs_Shape;
  static HasContinuity_3(E: TopoDS_Edge): Standard_Boolean;
  static MaxContinuity(theEdge: TopoDS_Edge): GeomAbs_Shape;
  static Pnt(V: TopoDS_Vertex): gp_Pnt;
  static Tolerance_3(V: TopoDS_Vertex): Standard_Real;
  static Parameter_1(
    theV: TopoDS_Vertex,
    theE: TopoDS_Edge,
    theParam: Standard_Real
  ): Standard_Boolean;
  static Parameter_2(V: TopoDS_Vertex, E: TopoDS_Edge): Standard_Real;
  static Parameter_3(V: TopoDS_Vertex, E: TopoDS_Edge, F: TopoDS_Face): Standard_Real;
  static Parameter_4(
    V: TopoDS_Vertex,
    E: TopoDS_Edge,
    S: Handle_Geom_Surface,
    L: TopLoc_Location
  ): Standard_Real;
  static Parameters(V: TopoDS_Vertex, F: TopoDS_Face): gp_Pnt2d;
  static MaxTolerance(theShape: TopoDS_Shape, theSubShape: TopAbs_ShapeEnum): Standard_Real;
  delete(): void;
}

export declare class BRepMesh_IncrementalMesh extends BRepMesh_DiscretRoot {
  Perform_1(theRange: Message_ProgressRange): void;
  Perform_2(theContext: any, theRange: Message_ProgressRange): void;
  Parameters(): IMeshTools_Parameters;
  ChangeParameters(): IMeshTools_Parameters;
  IsModified(): Standard_Boolean;
  GetStatusFlags(): Graphic3d_ZLayerId;
  static Discret(
    theShape: TopoDS_Shape,
    theLinDeflection: Standard_Real,
    theAngDeflection: Standard_Real,
    theAlgo: BRepMesh_DiscretRoot
  ): Graphic3d_ZLayerId;
  static IsParallelDefault(): Standard_Boolean;
  static SetParallelDefault(isInParallel: Standard_Boolean): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

export declare class BRepMesh_IncrementalMesh_1 extends BRepMesh_IncrementalMesh {
  constructor();
}

export declare class BRepMesh_IncrementalMesh_2 extends BRepMesh_IncrementalMesh {
  constructor(
    theShape: TopoDS_Shape,
    theLinDeflection: Standard_Real,
    isRelative: Standard_Boolean,
    theAngDeflection: Standard_Real,
    isInParallel: Standard_Boolean
  );
}

export declare class BRepMesh_IncrementalMesh_3 extends BRepMesh_IncrementalMesh {
  constructor(
    theShape: TopoDS_Shape,
    theParameters: IMeshTools_Parameters,
    theRange: Message_ProgressRange
  );
}

export declare class BRepMesh_DiscretRoot extends Standard_Transient {
  SetShape(theShape: TopoDS_Shape): void;
  Shape(): TopoDS_Shape;
  IsDone(): Standard_Boolean;
  Perform(theRange: Message_ProgressRange): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

export declare class Bnd_Box {
  SetWhole(): void;
  SetVoid(): void;
  Set_1(P: gp_Pnt): void;
  Set_2(P: gp_Pnt, D: gp_Dir): void;
  Update_1(
    aXmin: Standard_Real,
    aYmin: Standard_Real,
    aZmin: Standard_Real,
    aXmax: Standard_Real,
    aYmax: Standard_Real,
    aZmax: Standard_Real
  ): void;
  Update_2(X: Standard_Real, Y: Standard_Real, Z: Standard_Real): void;
  GetGap(): Standard_Real;
  SetGap(Tol: Standard_Real): void;
  Enlarge(Tol: Standard_Real): void;
  Get(
    theXmin: Standard_Real,
    theYmin: Standard_Real,
    theZmin: Standard_Real,
    theXmax: Standard_Real,
    theYmax: Standard_Real,
    theZmax: Standard_Real
  ): void;
  CornerMin(): gp_Pnt;
  CornerMax(): gp_Pnt;
  OpenXmin(): void;
  OpenXmax(): void;
  OpenYmin(): void;
  OpenYmax(): void;
  OpenZmin(): void;
  OpenZmax(): void;
  IsOpen(): Standard_Boolean;
  IsOpenXmin(): Standard_Boolean;
  IsOpenXmax(): Standard_Boolean;
  IsOpenYmin(): Standard_Boolean;
  IsOpenYmax(): Standard_Boolean;
  IsOpenZmin(): Standard_Boolean;
  IsOpenZmax(): Standard_Boolean;
  IsWhole(): Standard_Boolean;
  IsVoid(): Standard_Boolean;
  IsXThin(tol: Standard_Real): Standard_Boolean;
  IsYThin(tol: Standard_Real): Standard_Boolean;
  IsZThin(tol: Standard_Real): Standard_Boolean;
  IsThin(tol: Standard_Real): Standard_Boolean;
  Transformed(T: gp_Trsf): Bnd_Box;
  Add_1(Other: Bnd_Box): void;
  Add_2(P: gp_Pnt): void;
  Add_3(P: gp_Pnt, D: gp_Dir): void;
  Add_4(D: gp_Dir): void;
  IsOut_1(P: gp_Pnt): Standard_Boolean;
  IsOut_2(L: gp_Lin): Standard_Boolean;
  IsOut_3(P: gp_Pln): Standard_Boolean;
  IsOut_4(Other: Bnd_Box): Standard_Boolean;
  IsOut_5(Other: Bnd_Box, T: gp_Trsf): Standard_Boolean;
  IsOut_6(T1: gp_Trsf, Other: Bnd_Box, T2: gp_Trsf): Standard_Boolean;
  IsOut_7(P1: gp_Pnt, P2: gp_Pnt, D: gp_Dir): Standard_Boolean;
  Distance(Other: Bnd_Box): Standard_Real;
  Dump(): void;
  SquareExtent(): Standard_Real;
  FinitePart(): Bnd_Box;
  HasFinitePart(): Standard_Boolean;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  InitFromJson(theSStream: Standard_SStream, theStreamPos: Graphic3d_ZLayerId): Standard_Boolean;
  delete(): void;
}

export declare class Bnd_Box_1 extends Bnd_Box {
  constructor();
}

export declare class Bnd_Box_2 extends Bnd_Box {
  constructor(theMin: gp_Pnt, theMax: gp_Pnt);
}

export declare class StdPrs_ToolTriangulatedShape {
  constructor();
  static IsTriangulated(theShape: TopoDS_Shape): Standard_Boolean;
  static IsClosed(theShape: TopoDS_Shape): Standard_Boolean;
  static ComputeNormals_1(theFace: TopoDS_Face, theTris: Handle_Poly_Triangulation): void;
  static ComputeNormals_2(
    theFace: TopoDS_Face,
    theTris: Handle_Poly_Triangulation,
    thePolyConnect: Poly_Connect
  ): void;
  static Normal(
    theFace: TopoDS_Face,
    thePolyConnect: Poly_Connect,
    theNormals: TColgp_Array1OfDir
  ): void;
  static GetDeflection(theShape: TopoDS_Shape, theDrawer: Handle_Prs3d_Drawer): Standard_Real;
  static IsTessellated(theShape: TopoDS_Shape, theDrawer: Handle_Prs3d_Drawer): Standard_Boolean;
  static Tessellate(theShape: TopoDS_Shape, theDrawer: Handle_Prs3d_Drawer): Standard_Boolean;
  static ClearOnOwnDeflectionChange(
    theShape: TopoDS_Shape,
    theDrawer: Handle_Prs3d_Drawer,
    theToResetCoeff: Standard_Boolean
  ): void;
  delete(): void;
}

export declare class IGESControl_Reader extends XSControl_Reader {
  SetReadVisible(ReadRoot: Standard_Boolean): void;
  GetReadVisible(): Standard_Boolean;
  IGESModel(): Handle_IGESData_IGESModel;
  NbRootsForTransfer(): Graphic3d_ZLayerId;
  PrintTransferInfo(failwarn: IFSelect_PrintFail, mode: IFSelect_PrintCount): void;
  delete(): void;
}

export declare class IGESControl_Reader_1 extends IGESControl_Reader {
  constructor();
}

export declare class IGESControl_Reader_2 extends IGESControl_Reader {
  constructor(WS: Handle_XSControl_WorkSession, scratch: Standard_Boolean);
}

export declare class BRepTools {
  constructor();
  static UVBounds_1(
    F: TopoDS_Face,
    UMin: Standard_Real,
    UMax: Standard_Real,
    VMin: Standard_Real,
    VMax: Standard_Real
  ): void;
  static UVBounds_2(
    F: TopoDS_Face,
    W: TopoDS_Wire,
    UMin: Standard_Real,
    UMax: Standard_Real,
    VMin: Standard_Real,
    VMax: Standard_Real
  ): void;
  static UVBounds_3(
    F: TopoDS_Face,
    E: TopoDS_Edge,
    UMin: Standard_Real,
    UMax: Standard_Real,
    VMin: Standard_Real,
    VMax: Standard_Real
  ): void;
  static AddUVBounds_1(F: TopoDS_Face, B: Bnd_Box2d): void;
  static AddUVBounds_2(F: TopoDS_Face, W: TopoDS_Wire, B: Bnd_Box2d): void;
  static AddUVBounds_3(F: TopoDS_Face, E: TopoDS_Edge, B: Bnd_Box2d): void;
  static Update_1(V: TopoDS_Vertex): void;
  static Update_2(E: TopoDS_Edge): void;
  static Update_3(W: TopoDS_Wire): void;
  static Update_4(F: TopoDS_Face): void;
  static Update_5(S: TopoDS_Shell): void;
  static Update_6(S: TopoDS_Solid): void;
  static Update_7(C: TopoDS_CompSolid): void;
  static Update_8(C: TopoDS_Compound): void;
  static Update_9(S: TopoDS_Shape): void;
  static UpdateFaceUVPoints(theF: TopoDS_Face): void;
  static Clean(theShape: TopoDS_Shape, theForce: Standard_Boolean): void;
  static CleanGeometry(theShape: TopoDS_Shape): void;
  static RemoveUnusedPCurves(S: TopoDS_Shape): void;
  static Triangulation(
    theShape: TopoDS_Shape,
    theLinDefl: Standard_Real,
    theToCheckFreeEdges: Standard_Boolean
  ): Standard_Boolean;
  static LoadTriangulation(
    theShape: TopoDS_Shape,
    theTriangulationIdx: Graphic3d_ZLayerId,
    theToSetAsActive: Standard_Boolean,
    theFileSystem: any
  ): Standard_Boolean;
  static UnloadTriangulation(
    theShape: TopoDS_Shape,
    theTriangulationIdx: Graphic3d_ZLayerId
  ): Standard_Boolean;
  static ActivateTriangulation(
    theShape: TopoDS_Shape,
    theTriangulationIdx: Graphic3d_ZLayerId,
    theToActivateStrictly: Standard_Boolean
  ): Standard_Boolean;
  static LoadAllTriangulations(theShape: TopoDS_Shape, theFileSystem: any): Standard_Boolean;
  static UnloadAllTriangulations(theShape: TopoDS_Shape): Standard_Boolean;
  static Compare_1(V1: TopoDS_Vertex, V2: TopoDS_Vertex): Standard_Boolean;
  static Compare_2(E1: TopoDS_Edge, E2: TopoDS_Edge): Standard_Boolean;
  static OuterWire(F: TopoDS_Face): TopoDS_Wire;
  static Map3DEdges(S: TopoDS_Shape, M: TopTools_IndexedMapOfShape): void;
  static IsReallyClosed(E: TopoDS_Edge, F: TopoDS_Face): Standard_Boolean;
  static DetectClosedness(
    theFace: TopoDS_Face,
    theUclosed: Standard_Boolean,
    theVclosed: Standard_Boolean
  ): void;
  static Dump(Sh: TopoDS_Shape, S: Standard_OStream): void;
  static Write_1(
    theShape: TopoDS_Shape,
    theStream: Standard_OStream,
    theProgress: Message_ProgressRange
  ): void;
  static Write_2(
    theShape: TopoDS_Shape,
    theStream: Standard_OStream,
    theWithTriangles: Standard_Boolean,
    theWithNormals: Standard_Boolean,
    theVersion: TopTools_FormatVersion,
    theProgress: Message_ProgressRange
  ): void;
  static Read_1(
    Sh: TopoDS_Shape,
    S: Standard_IStream,
    B: BRep_Builder,
    theProgress: Message_ProgressRange
  ): void;
  static Write_3(
    theShape: TopoDS_Shape,
    theFile: Standard_CString,
    theProgress: Message_ProgressRange
  ): Standard_Boolean;
  static Write_4(
    theShape: TopoDS_Shape,
    theFile: Standard_CString,
    theWithTriangles: Standard_Boolean,
    theWithNormals: Standard_Boolean,
    theVersion: TopTools_FormatVersion,
    theProgress: Message_ProgressRange
  ): Standard_Boolean;
  static Read_2(
    Sh: TopoDS_Shape,
    File: Standard_CString,
    B: BRep_Builder,
    theProgress: Message_ProgressRange
  ): Standard_Boolean;
  static EvalAndUpdateTol(
    theE: TopoDS_Edge,
    theC3d: Handle_Geom_Curve,
    theC2d: Handle_Geom2d_Curve,
    theS: Handle_Geom_Surface,
    theF: Standard_Real,
    theL: Standard_Real
  ): Standard_Real;
  static OriEdgeInFace(theEdge: TopoDS_Edge, theFace: TopoDS_Face): TopAbs_Orientation;
  static RemoveInternals(theS: TopoDS_Shape, theForce: Standard_Boolean): void;
  static CheckLocations(theS: TopoDS_Shape, theProblemShapes: TopTools_ListOfShape): void;
  delete(): void;
}

export declare class Poly_Triangulation extends Standard_Transient {
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  Copy(): Handle_Poly_Triangulation;
  Deflection_1(): Standard_Real;
  Deflection_2(theDeflection: Standard_Real): void;
  Parameters_1(): Handle_Poly_TriangulationParameters;
  Parameters_2(theParams: Handle_Poly_TriangulationParameters): void;
  Clear(): void;
  HasGeometry(): Standard_Boolean;
  NbNodes(): Graphic3d_ZLayerId;
  NbTriangles(): Graphic3d_ZLayerId;
  HasUVNodes(): Standard_Boolean;
  HasNormals(): Standard_Boolean;
  Node(theIndex: Graphic3d_ZLayerId): gp_Pnt;
  SetNode(theIndex: Graphic3d_ZLayerId, thePnt: gp_Pnt): void;
  UVNode(theIndex: Graphic3d_ZLayerId): gp_Pnt2d;
  SetUVNode(theIndex: Graphic3d_ZLayerId, thePnt: gp_Pnt2d): void;
  Triangle(theIndex: Graphic3d_ZLayerId): Poly_Triangle;
  SetTriangle(theIndex: Graphic3d_ZLayerId, theTriangle: Poly_Triangle): void;
  Normal_1(theIndex: Graphic3d_ZLayerId): gp_Dir;
  Normal_2(theIndex: Graphic3d_ZLayerId, theVec3: gp_Vec3f): void;
  SetNormal_1(theIndex: Graphic3d_ZLayerId, theNormal: gp_Vec3f): void;
  SetNormal_2(theIndex: Graphic3d_ZLayerId, theNormal: gp_Dir): void;
  MeshPurpose(): Poly_MeshPurpose;
  SetMeshPurpose(thePurpose: Poly_MeshPurpose): void;
  CachedMinMax(): Bnd_Box;
  SetCachedMinMax(theBox: Bnd_Box): void;
  HasCachedMinMax(): Standard_Boolean;
  UpdateCachedMinMax(): void;
  MinMax(theBox: Bnd_Box, theTrsf: gp_Trsf, theIsAccurate: Standard_Boolean): Standard_Boolean;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  IsDoublePrecision(): Standard_Boolean;
  SetDoublePrecision(theIsDouble: Standard_Boolean): void;
  ResizeNodes(theNbNodes: Graphic3d_ZLayerId, theToCopyOld: Standard_Boolean): void;
  ResizeTriangles(theNbTriangles: Graphic3d_ZLayerId, theToCopyOld: Standard_Boolean): void;
  AddUVNodes(): void;
  RemoveUVNodes(): void;
  AddNormals(): void;
  RemoveNormals(): void;
  ComputeNormals(): void;
  MapNodeArray(): Handle_TColgp_HArray1OfPnt;
  MapTriangleArray(): Handle_Poly_HArray1OfTriangle;
  MapUVNodeArray(): Handle_TColgp_HArray1OfPnt2d;
  MapNormalArray(): Handle_TShort_HArray1OfShortReal;
  InternalTriangles(): Poly_Array1OfTriangle;
  InternalNodes(): Poly_ArrayOfNodes;
  InternalUVNodes(): Poly_ArrayOfUVNodes;
  InternalNormals(): any;
  SetNormals(theNormals: Handle_TShort_HArray1OfShortReal): void;
  Triangles(): Poly_Array1OfTriangle;
  ChangeTriangles(): Poly_Array1OfTriangle;
  ChangeTriangle(theIndex: Graphic3d_ZLayerId): Poly_Triangle;
  NbDeferredNodes(): Graphic3d_ZLayerId;
  NbDeferredTriangles(): Graphic3d_ZLayerId;
  HasDeferredData(): Standard_Boolean;
  LoadDeferredData(theFileSystem: any): Standard_Boolean;
  DetachedLoadDeferredData(theFileSystem: any): Handle_Poly_Triangulation;
  UnloadDeferredData(): Standard_Boolean;
  delete(): void;
}

export declare class Poly_Triangulation_1 extends Poly_Triangulation {
  constructor();
}

export declare class Poly_Triangulation_2 extends Poly_Triangulation {
  constructor(
    theNbNodes: Graphic3d_ZLayerId,
    theNbTriangles: Graphic3d_ZLayerId,
    theHasUVNodes: Standard_Boolean,
    theHasNormals: Standard_Boolean
  );
}

export declare class Poly_Triangulation_3 extends Poly_Triangulation {
  constructor(Nodes: TColgp_Array1OfPnt, Triangles: Poly_Array1OfTriangle);
}

export declare class Poly_Triangulation_4 extends Poly_Triangulation {
  constructor(
    Nodes: TColgp_Array1OfPnt,
    UVNodes: TColgp_Array1OfPnt2d,
    Triangles: Poly_Array1OfTriangle
  );
}

export declare class Poly_Triangulation_5 extends Poly_Triangulation {
  constructor(theTriangulation: Handle_Poly_Triangulation);
}

export declare class Handle_Poly_Triangulation {
  Nullify(): void;
  IsNull(): boolean;
  reset(thePtr: Poly_Triangulation): void;
  get(): Poly_Triangulation;
  delete(): void;
}

export declare class Handle_Poly_Triangulation_1 extends Handle_Poly_Triangulation {
  constructor();
}

export declare class Handle_Poly_Triangulation_2 extends Handle_Poly_Triangulation {
  constructor(thePtr: Poly_Triangulation);
}

export declare class Handle_Poly_Triangulation_3 extends Handle_Poly_Triangulation {
  constructor(theHandle: Handle_Poly_Triangulation);
}

export declare class Handle_Poly_Triangulation_4 extends Handle_Poly_Triangulation {
  constructor(theHandle: Handle_Poly_Triangulation);
}

export declare class Poly_PolygonOnTriangulation extends Standard_Transient {
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  Copy(): Handle_Poly_PolygonOnTriangulation;
  Deflection_1(): Standard_Real;
  Deflection_2(theDefl: Standard_Real): void;
  NbNodes(): Graphic3d_ZLayerId;
  Node(theIndex: Graphic3d_ZLayerId): Graphic3d_ZLayerId;
  SetNode(theIndex: Graphic3d_ZLayerId, theNode: Graphic3d_ZLayerId): void;
  HasParameters(): Standard_Boolean;
  Parameter(theIndex: Graphic3d_ZLayerId): Standard_Real;
  SetParameter(theIndex: Graphic3d_ZLayerId, theValue: Standard_Real): void;
  SetParameters(theParameters: Handle_TColStd_HArray1OfReal): void;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  Nodes(): TColStd_Array1OfInteger;
  Parameters(): Handle_TColStd_HArray1OfReal;
  ChangeNodes(): TColStd_Array1OfInteger;
  ChangeParameters(): IntTools_CArray1OfReal;
  delete(): void;
}

export declare class Poly_PolygonOnTriangulation_1 extends Poly_PolygonOnTriangulation {
  constructor(theNbNodes: Graphic3d_ZLayerId, theHasParams: Standard_Boolean);
}

export declare class Poly_PolygonOnTriangulation_2 extends Poly_PolygonOnTriangulation {
  constructor(Nodes: TColStd_Array1OfInteger);
}

export declare class Poly_PolygonOnTriangulation_3 extends Poly_PolygonOnTriangulation {
  constructor(Nodes: TColStd_Array1OfInteger, Parameters: IntTools_CArray1OfReal);
}

export declare class Handle_Poly_PolygonOnTriangulation {
  Nullify(): void;
  IsNull(): boolean;
  reset(thePtr: Poly_PolygonOnTriangulation): void;
  get(): Poly_PolygonOnTriangulation;
  delete(): void;
}

export declare class Handle_Poly_PolygonOnTriangulation_1 extends Handle_Poly_PolygonOnTriangulation {
  constructor();
}

export declare class Handle_Poly_PolygonOnTriangulation_2 extends Handle_Poly_PolygonOnTriangulation {
  constructor(thePtr: Poly_PolygonOnTriangulation);
}

export declare class Handle_Poly_PolygonOnTriangulation_3 extends Handle_Poly_PolygonOnTriangulation {
  constructor(theHandle: Handle_Poly_PolygonOnTriangulation);
}

export declare class Handle_Poly_PolygonOnTriangulation_4 extends Handle_Poly_PolygonOnTriangulation {
  constructor(theHandle: Handle_Poly_PolygonOnTriangulation);
}

export declare class Poly_Array1OfTriangle {
  begin(): any;
  end(): any;
  cbegin(): any;
  cend(): any;
  Init(theValue: Poly_Triangle): void;
  Size(): Standard_Integer;
  Length(): Standard_Integer;
  IsEmpty(): Standard_Boolean;
  Lower(): Standard_Integer;
  Upper(): Standard_Integer;
  IsDeletable(): Standard_Boolean;
  IsAllocated(): Standard_Boolean;
  Assign(theOther: Poly_Array1OfTriangle): Poly_Array1OfTriangle;
  Move(theOther: Poly_Array1OfTriangle): Poly_Array1OfTriangle;
  First(): Poly_Triangle;
  ChangeFirst(): Poly_Triangle;
  Last(): Poly_Triangle;
  ChangeLast(): Poly_Triangle;
  Value(theIndex: Standard_Integer): Poly_Triangle;
  ChangeValue(theIndex: Standard_Integer): Poly_Triangle;
  SetValue(theIndex: Standard_Integer, theItem: Poly_Triangle): void;
  Resize(
    theLower: Standard_Integer,
    theUpper: Standard_Integer,
    theToCopyData: Standard_Boolean
  ): void;
  delete(): void;
}

export declare class Poly_Array1OfTriangle_1 extends Poly_Array1OfTriangle {
  constructor();
}

export declare class Poly_Array1OfTriangle_2 extends Poly_Array1OfTriangle {
  constructor(theLower: Standard_Integer, theUpper: Standard_Integer);
}

export declare class Poly_Array1OfTriangle_3 extends Poly_Array1OfTriangle {
  constructor(theOther: Poly_Array1OfTriangle);
}

export declare class Poly_Array1OfTriangle_4 extends Poly_Array1OfTriangle {
  constructor(theOther: Poly_Array1OfTriangle);
}

export declare class Poly_Array1OfTriangle_5 extends Poly_Array1OfTriangle {
  constructor(theBegin: Poly_Triangle, theLower: Standard_Integer, theUpper: Standard_Integer);
}

export declare class Poly_Triangle {
  Set_1(theN1: Graphic3d_ZLayerId, theN2: Graphic3d_ZLayerId, theN3: Graphic3d_ZLayerId): void;
  Set_2(theIndex: Graphic3d_ZLayerId, theNode: Graphic3d_ZLayerId): void;
  Get(theN1: Graphic3d_ZLayerId, theN2: Graphic3d_ZLayerId, theN3: Graphic3d_ZLayerId): void;
  Value(theIndex: Graphic3d_ZLayerId): Graphic3d_ZLayerId;
  ChangeValue(theIndex: Graphic3d_ZLayerId): Graphic3d_ZLayerId;
  delete(): void;
}

export declare class Poly_Triangle_1 extends Poly_Triangle {
  constructor();
}

export declare class Poly_Triangle_2 extends Poly_Triangle {
  constructor(theN1: Graphic3d_ZLayerId, theN2: Graphic3d_ZLayerId, theN3: Graphic3d_ZLayerId);
}

export declare class Poly_Connect {
  Load(theTriangulation: Handle_Poly_Triangulation): void;
  Triangulation(): Handle_Poly_Triangulation;
  Triangle(N: Graphic3d_ZLayerId): Graphic3d_ZLayerId;
  Triangles(
    T: Graphic3d_ZLayerId,
    t1: Graphic3d_ZLayerId,
    t2: Graphic3d_ZLayerId,
    t3: Graphic3d_ZLayerId
  ): void;
  Nodes(
    T: Graphic3d_ZLayerId,
    n1: Graphic3d_ZLayerId,
    n2: Graphic3d_ZLayerId,
    n3: Graphic3d_ZLayerId
  ): void;
  Initialize(N: Graphic3d_ZLayerId): void;
  More(): Standard_Boolean;
  Next(): void;
  Value(): Graphic3d_ZLayerId;
  delete(): void;
}

export declare class Poly_Connect_1 extends Poly_Connect {
  constructor();
}

export declare class Poly_Connect_2 extends Poly_Connect {
  constructor(theTriangulation: Handle_Poly_Triangulation);
}

export declare class TColgp_Array1OfDir {
  begin(): any;
  end(): any;
  cbegin(): any;
  cend(): any;
  Init(theValue: gp_Dir): void;
  Size(): Standard_Integer;
  Length(): Standard_Integer;
  IsEmpty(): Standard_Boolean;
  Lower(): Standard_Integer;
  Upper(): Standard_Integer;
  IsDeletable(): Standard_Boolean;
  IsAllocated(): Standard_Boolean;
  Assign(theOther: TColgp_Array1OfDir): TColgp_Array1OfDir;
  Move(theOther: TColgp_Array1OfDir): TColgp_Array1OfDir;
  First(): gp_Dir;
  ChangeFirst(): gp_Dir;
  Last(): gp_Dir;
  ChangeLast(): gp_Dir;
  Value(theIndex: Standard_Integer): gp_Dir;
  ChangeValue(theIndex: Standard_Integer): gp_Dir;
  SetValue(theIndex: Standard_Integer, theItem: gp_Dir): void;
  Resize(
    theLower: Standard_Integer,
    theUpper: Standard_Integer,
    theToCopyData: Standard_Boolean
  ): void;
  delete(): void;
}

export declare class TColgp_Array1OfDir_1 extends TColgp_Array1OfDir {
  constructor();
}

export declare class TColgp_Array1OfDir_2 extends TColgp_Array1OfDir {
  constructor(theLower: Standard_Integer, theUpper: Standard_Integer);
}

export declare class TColgp_Array1OfDir_3 extends TColgp_Array1OfDir {
  constructor(theOther: TColgp_Array1OfDir);
}

export declare class TColgp_Array1OfDir_4 extends TColgp_Array1OfDir {
  constructor(theOther: TColgp_Array1OfDir);
}

export declare class TColgp_Array1OfDir_5 extends TColgp_Array1OfDir {
  constructor(theBegin: gp_Dir, theLower: Standard_Integer, theUpper: Standard_Integer);
}

export declare class TColgp_Array1OfPnt {
  begin(): any;
  end(): any;
  cbegin(): any;
  cend(): any;
  Init(theValue: gp_Pnt): void;
  Size(): Standard_Integer;
  Length(): Standard_Integer;
  IsEmpty(): Standard_Boolean;
  Lower(): Standard_Integer;
  Upper(): Standard_Integer;
  IsDeletable(): Standard_Boolean;
  IsAllocated(): Standard_Boolean;
  Assign(theOther: TColgp_Array1OfPnt): TColgp_Array1OfPnt;
  Move(theOther: TColgp_Array1OfPnt): TColgp_Array1OfPnt;
  First(): gp_Pnt;
  ChangeFirst(): gp_Pnt;
  Last(): gp_Pnt;
  ChangeLast(): gp_Pnt;
  Value(theIndex: Standard_Integer): gp_Pnt;
  ChangeValue(theIndex: Standard_Integer): gp_Pnt;
  SetValue(theIndex: Standard_Integer, theItem: gp_Pnt): void;
  Resize(
    theLower: Standard_Integer,
    theUpper: Standard_Integer,
    theToCopyData: Standard_Boolean
  ): void;
  delete(): void;
}

export declare class TColgp_Array1OfPnt_1 extends TColgp_Array1OfPnt {
  constructor();
}

export declare class TColgp_Array1OfPnt_2 extends TColgp_Array1OfPnt {
  constructor(theLower: Standard_Integer, theUpper: Standard_Integer);
}

export declare class TColgp_Array1OfPnt_3 extends TColgp_Array1OfPnt {
  constructor(theOther: TColgp_Array1OfPnt);
}

export declare class TColgp_Array1OfPnt_4 extends TColgp_Array1OfPnt {
  constructor(theOther: TColgp_Array1OfPnt);
}

export declare class TColgp_Array1OfPnt_5 extends TColgp_Array1OfPnt {
  constructor(theBegin: gp_Pnt, theLower: Standard_Integer, theUpper: Standard_Integer);
}

export declare class TColgp_Array1OfPnt2d {
  begin(): any;
  end(): any;
  cbegin(): any;
  cend(): any;
  Init(theValue: gp_Pnt2d): void;
  Size(): Standard_Integer;
  Length(): Standard_Integer;
  IsEmpty(): Standard_Boolean;
  Lower(): Standard_Integer;
  Upper(): Standard_Integer;
  IsDeletable(): Standard_Boolean;
  IsAllocated(): Standard_Boolean;
  Assign(theOther: TColgp_Array1OfPnt2d): TColgp_Array1OfPnt2d;
  Move(theOther: TColgp_Array1OfPnt2d): TColgp_Array1OfPnt2d;
  First(): gp_Pnt2d;
  ChangeFirst(): gp_Pnt2d;
  Last(): gp_Pnt2d;
  ChangeLast(): gp_Pnt2d;
  Value(theIndex: Standard_Integer): gp_Pnt2d;
  ChangeValue(theIndex: Standard_Integer): gp_Pnt2d;
  SetValue(theIndex: Standard_Integer, theItem: gp_Pnt2d): void;
  Resize(
    theLower: Standard_Integer,
    theUpper: Standard_Integer,
    theToCopyData: Standard_Boolean
  ): void;
  delete(): void;
}

export declare class TColgp_Array1OfPnt2d_1 extends TColgp_Array1OfPnt2d {
  constructor();
}

export declare class TColgp_Array1OfPnt2d_2 extends TColgp_Array1OfPnt2d {
  constructor(theLower: Standard_Integer, theUpper: Standard_Integer);
}

export declare class TColgp_Array1OfPnt2d_3 extends TColgp_Array1OfPnt2d {
  constructor(theOther: TColgp_Array1OfPnt2d);
}

export declare class TColgp_Array1OfPnt2d_4 extends TColgp_Array1OfPnt2d {
  constructor(theOther: TColgp_Array1OfPnt2d);
}

export declare class TColgp_Array1OfPnt2d_5 extends TColgp_Array1OfPnt2d {
  constructor(theBegin: gp_Pnt2d, theLower: Standard_Integer, theUpper: Standard_Integer);
}

export declare type TopAbs_Orientation = {
  TopAbs_FORWARD: {};
  TopAbs_REVERSED: {};
  TopAbs_INTERNAL: {};
  TopAbs_EXTERNAL: {};
};

export declare type TopAbs_ShapeEnum = {
  TopAbs_COMPOUND: {};
  TopAbs_COMPSOLID: {};
  TopAbs_SOLID: {};
  TopAbs_SHELL: {};
  TopAbs_FACE: {};
  TopAbs_WIRE: {};
  TopAbs_EDGE: {};
  TopAbs_VERTEX: {};
  TopAbs_SHAPE: {};
};

export declare class TopoDS_Solid extends TopoDS_Shape {
  constructor();
  delete(): void;
}

export declare class TopoDS_Shell extends TopoDS_Shape {
  constructor();
  delete(): void;
}

export declare class TopoDS {
  constructor();
  static Vertex_1(S: TopoDS_Shape): TopoDS_Vertex;
  static Vertex_2(a0: TopoDS_Shape): TopoDS_Vertex;
  static Edge_1(S: TopoDS_Shape): TopoDS_Edge;
  static Edge_2(a0: TopoDS_Shape): TopoDS_Edge;
  static Wire_1(S: TopoDS_Shape): TopoDS_Wire;
  static Wire_2(a0: TopoDS_Shape): TopoDS_Wire;
  static Face_1(S: TopoDS_Shape): TopoDS_Face;
  static Face_2(a0: TopoDS_Shape): TopoDS_Face;
  static Shell_1(S: TopoDS_Shape): TopoDS_Shell;
  static Shell_2(a0: TopoDS_Shape): TopoDS_Shell;
  static Solid_1(S: TopoDS_Shape): TopoDS_Solid;
  static Solid_2(a0: TopoDS_Shape): TopoDS_Solid;
  static CompSolid_1(S: TopoDS_Shape): TopoDS_CompSolid;
  static CompSolid_2(a0: TopoDS_Shape): TopoDS_CompSolid;
  static Compound_1(S: TopoDS_Shape): TopoDS_Compound;
  static Compound_2(a0: TopoDS_Shape): TopoDS_Compound;
  delete(): void;
}

export declare class TopoDS_Edge extends TopoDS_Shape {
  constructor();
  delete(): void;
}

export declare class TopoDS_HShape extends Standard_Transient {
  Shape_1(aShape: TopoDS_Shape): void;
  Shape_2(): TopoDS_Shape;
  ChangeShape(): TopoDS_Shape;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  delete(): void;
}

export declare class TopoDS_HShape_1 extends TopoDS_HShape {
  constructor();
}

export declare class TopoDS_HShape_2 extends TopoDS_HShape {
  constructor(aShape: TopoDS_Shape);
}

export declare class TopoDS_Vertex extends TopoDS_Shape {
  constructor();
  delete(): void;
}

export declare class TopoDS_Shape {
  constructor();
  IsNull(): Standard_Boolean;
  Nullify(): void;
  Location_1(): TopLoc_Location;
  Location_2(theLoc: TopLoc_Location, theRaiseExc: Standard_Boolean): void;
  Located(theLoc: TopLoc_Location, theRaiseExc: Standard_Boolean): TopoDS_Shape;
  Orientation_1(): TopAbs_Orientation;
  Orientation_2(theOrient: TopAbs_Orientation): void;
  Oriented(theOrient: TopAbs_Orientation): TopoDS_Shape;
  TShape_1(): Handle_TopoDS_TShape;
  ShapeType(): TopAbs_ShapeEnum;
  Free_1(): Standard_Boolean;
  Free_2(theIsFree: Standard_Boolean): void;
  Locked_1(): Standard_Boolean;
  Locked_2(theIsLocked: Standard_Boolean): void;
  Modified_1(): Standard_Boolean;
  Modified_2(theIsModified: Standard_Boolean): void;
  Checked_1(): Standard_Boolean;
  Checked_2(theIsChecked: Standard_Boolean): void;
  Orientable_1(): Standard_Boolean;
  Orientable_2(theIsOrientable: Standard_Boolean): void;
  Closed_1(): Standard_Boolean;
  Closed_2(theIsClosed: Standard_Boolean): void;
  Infinite_1(): Standard_Boolean;
  Infinite_2(theIsInfinite: Standard_Boolean): void;
  Convex_1(): Standard_Boolean;
  Convex_2(theIsConvex: Standard_Boolean): void;
  Move(thePosition: TopLoc_Location, theRaiseExc: Standard_Boolean): void;
  Moved(thePosition: TopLoc_Location, theRaiseExc: Standard_Boolean): TopoDS_Shape;
  Reverse(): void;
  Reversed(): TopoDS_Shape;
  Complement(): void;
  Complemented(): TopoDS_Shape;
  Compose(theOrient: TopAbs_Orientation): void;
  Composed(theOrient: TopAbs_Orientation): TopoDS_Shape;
  NbChildren(): Graphic3d_ZLayerId;
  IsPartner(theOther: TopoDS_Shape): Standard_Boolean;
  IsSame(theOther: TopoDS_Shape): Standard_Boolean;
  IsEqual(theOther: TopoDS_Shape): Standard_Boolean;
  IsNotEqual(theOther: TopoDS_Shape): Standard_Boolean;
  HashCode(theUpperBound: Graphic3d_ZLayerId): Graphic3d_ZLayerId;
  EmptyCopy(): void;
  EmptyCopied(): TopoDS_Shape;
  TShape_2(theTShape: Handle_TopoDS_TShape): void;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  delete(): void;
}

export declare class TopoDS_Builder {
  constructor();
  MakeWire(W: TopoDS_Wire): void;
  MakeShell(S: TopoDS_Shell): void;
  MakeSolid(S: TopoDS_Solid): void;
  MakeCompSolid(C: TopoDS_CompSolid): void;
  MakeCompound(C: TopoDS_Compound): void;
  Add(S: TopoDS_Shape, C: TopoDS_Shape): void;
  Remove(S: TopoDS_Shape, C: TopoDS_Shape): void;
  delete(): void;
}

export declare class TopoDS_Face extends TopoDS_Shape {
  constructor();
  delete(): void;
}

export declare class TopoDS_Compound extends TopoDS_Shape {
  constructor();
  delete(): void;
}

export declare class BRepGProp {
  constructor();
  static LinearProperties(
    S: TopoDS_Shape,
    LProps: GProp_GProps,
    SkipShared: Standard_Boolean,
    UseTriangulation: Standard_Boolean
  ): void;
  static SurfaceProperties_1(
    S: TopoDS_Shape,
    SProps: GProp_GProps,
    SkipShared: Standard_Boolean,
    UseTriangulation: Standard_Boolean
  ): void;
  static SurfaceProperties_2(
    S: TopoDS_Shape,
    SProps: GProp_GProps,
    Eps: Standard_Real,
    SkipShared: Standard_Boolean
  ): Standard_Real;
  static VolumeProperties_1(
    S: TopoDS_Shape,
    VProps: GProp_GProps,
    OnlyClosed: Standard_Boolean,
    SkipShared: Standard_Boolean,
    UseTriangulation: Standard_Boolean
  ): void;
  static VolumeProperties_2(
    S: TopoDS_Shape,
    VProps: GProp_GProps,
    Eps: Standard_Real,
    OnlyClosed: Standard_Boolean,
    SkipShared: Standard_Boolean
  ): Standard_Real;
  static VolumePropertiesGK_1(
    S: TopoDS_Shape,
    VProps: GProp_GProps,
    Eps: Standard_Real,
    OnlyClosed: Standard_Boolean,
    IsUseSpan: Standard_Boolean,
    CGFlag: Standard_Boolean,
    IFlag: Standard_Boolean,
    SkipShared: Standard_Boolean
  ): Standard_Real;
  static VolumePropertiesGK_2(
    S: TopoDS_Shape,
    VProps: GProp_GProps,
    thePln: gp_Pln,
    Eps: Standard_Real,
    OnlyClosed: Standard_Boolean,
    IsUseSpan: Standard_Boolean,
    CGFlag: Standard_Boolean,
    IFlag: Standard_Boolean,
    SkipShared: Standard_Boolean
  ): Standard_Real;
  delete(): void;
}

export declare class Standard_Transient {
  Delete(): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  IsInstance_1(theType: Handle_Standard_Type): Standard_Boolean;
  IsInstance_2(theTypeName: Standard_CString): Standard_Boolean;
  IsKind_1(theType: Handle_Standard_Type): Standard_Boolean;
  IsKind_2(theTypeName: Standard_CString): Standard_Boolean;
  This(): Standard_Transient;
  GetRefCount(): Graphic3d_ZLayerId;
  IncrementRefCounter(): void;
  DecrementRefCounter(): Graphic3d_ZLayerId;
  delete(): void;
}

export declare class Standard_Transient_1 extends Standard_Transient {
  constructor();
}

export declare class Standard_Transient_2 extends Standard_Transient {
  constructor(a: Standard_Transient);
}

export declare class GProp_GProps {
  Add(Item: GProp_GProps, Density: Standard_Real): void;
  Mass(): Standard_Real;
  CentreOfMass(): gp_Pnt;
  MatrixOfInertia(): gp_Mat;
  StaticMoments(Ix: Standard_Real, Iy: Standard_Real, Iz: Standard_Real): void;
  MomentOfInertia(A: gp_Ax1): Standard_Real;
  PrincipalProperties(): GProp_PrincipalProps;
  RadiusOfGyration(A: gp_Ax1): Standard_Real;
  delete(): void;
}

export declare class GProp_GProps_1 extends GProp_GProps {
  constructor();
}

export declare class GProp_GProps_2 extends GProp_GProps {
  constructor(SystemLocation: gp_Pnt);
}

export declare class TColStd_Array1OfInteger {
  begin(): any;
  end(): any;
  cbegin(): any;
  cend(): any;
  Init(theValue: Standard_Integer): void;
  Size(): Standard_Integer;
  Length(): Standard_Integer;
  IsEmpty(): Standard_Boolean;
  Lower(): Standard_Integer;
  Upper(): Standard_Integer;
  IsDeletable(): Standard_Boolean;
  IsAllocated(): Standard_Boolean;
  Assign(theOther: TColStd_Array1OfInteger): TColStd_Array1OfInteger;
  Move(theOther: TColStd_Array1OfInteger): TColStd_Array1OfInteger;
  First(): Standard_Integer;
  ChangeFirst(): Standard_Integer;
  Last(): Standard_Integer;
  ChangeLast(): Standard_Integer;
  Value(theIndex: Standard_Integer): Standard_Integer;
  ChangeValue(theIndex: Standard_Integer): Standard_Integer;
  SetValue(theIndex: Standard_Integer, theItem: Standard_Integer): void;
  Resize(
    theLower: Standard_Integer,
    theUpper: Standard_Integer,
    theToCopyData: Standard_Boolean
  ): void;
  delete(): void;
}

export declare class TColStd_Array1OfInteger_1 extends TColStd_Array1OfInteger {
  constructor();
}

export declare class TColStd_Array1OfInteger_2 extends TColStd_Array1OfInteger {
  constructor(theLower: Standard_Integer, theUpper: Standard_Integer);
}

export declare class TColStd_Array1OfInteger_3 extends TColStd_Array1OfInteger {
  constructor(theOther: TColStd_Array1OfInteger);
}

export declare class TColStd_Array1OfInteger_4 extends TColStd_Array1OfInteger {
  constructor(theOther: TColStd_Array1OfInteger);
}

export declare class TColStd_Array1OfInteger_5 extends TColStd_Array1OfInteger {
  constructor(theBegin: Standard_Integer, theLower: Standard_Integer, theUpper: Standard_Integer);
}

export declare class Adaptor3d_Curve extends Standard_Transient {
  constructor();
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  ShallowCopy(): Handle_Adaptor3d_Curve;
  FirstParameter(): Standard_Real;
  LastParameter(): Standard_Real;
  Continuity(): GeomAbs_Shape;
  NbIntervals(S: GeomAbs_Shape): Graphic3d_ZLayerId;
  Intervals(T: IntTools_CArray1OfReal, S: GeomAbs_Shape): void;
  Trim(First: Standard_Real, Last: Standard_Real, Tol: Standard_Real): Handle_Adaptor3d_Curve;
  IsClosed(): Standard_Boolean;
  IsPeriodic(): Standard_Boolean;
  Period(): Standard_Real;
  Value(U: Standard_Real): gp_Pnt;
  D0(U: Standard_Real, P: gp_Pnt): void;
  D1(U: Standard_Real, P: gp_Pnt, V: gp_Vec): void;
  D2(U: Standard_Real, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec): void;
  D3(U: Standard_Real, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec, V3: gp_Vec): void;
  DN(U: Standard_Real, N: Graphic3d_ZLayerId): gp_Vec;
  Resolution(R3d: Standard_Real): Standard_Real;
  GetType(): GeomAbs_CurveType;
  Line(): gp_Lin;
  Circle(): gp_Circ;
  Ellipse(): gp_Elips;
  Hyperbola(): gp_Hypr;
  Parabola(): gp_Parab;
  Degree(): Graphic3d_ZLayerId;
  IsRational(): Standard_Boolean;
  NbPoles(): Graphic3d_ZLayerId;
  NbKnots(): Graphic3d_ZLayerId;
  Bezier(): Handle_Geom_BezierCurve;
  BSpline(): Handle_Geom_BSplineCurve;
  OffsetCurve(): Handle_Geom_OffsetCurve;
  delete(): void;
}

export declare type IFSelect_ReturnStatus = {
  IFSelect_RetVoid: {};
  IFSelect_RetDone: {};
  IFSelect_RetError: {};
  IFSelect_RetFail: {};
  IFSelect_RetStop: {};
};

export declare class Message_ProgressRange {
  UserBreak(): Standard_Boolean;
  More(): Standard_Boolean;
  IsActive(): Standard_Boolean;
  Close(): void;
  delete(): void;
}

export declare class Message_ProgressRange_1 extends Message_ProgressRange {
  constructor();
}

export declare class Message_ProgressRange_2 extends Message_ProgressRange {
  constructor(theOther: Message_ProgressRange);
}

export declare class GCPnts_TangentialDeflection {
  Initialize_1(
    theC: Adaptor3d_Curve,
    theAngularDeflection: Standard_Real,
    theCurvatureDeflection: Standard_Real,
    theMinimumOfPoints: Graphic3d_ZLayerId,
    theUTol: Standard_Real,
    theMinLen: Standard_Real
  ): void;
  Initialize_2(
    theC: Adaptor3d_Curve,
    theFirstParameter: Standard_Real,
    theLastParameter: Standard_Real,
    theAngularDeflection: Standard_Real,
    theCurvatureDeflection: Standard_Real,
    theMinimumOfPoints: Graphic3d_ZLayerId,
    theUTol: Standard_Real,
    theMinLen: Standard_Real
  ): void;
  Initialize_3(
    theC: Adaptor2d_Curve2d,
    theAngularDeflection: Standard_Real,
    theCurvatureDeflection: Standard_Real,
    theMinimumOfPoints: Graphic3d_ZLayerId,
    theUTol: Standard_Real,
    theMinLen: Standard_Real
  ): void;
  Initialize_4(
    theC: Adaptor2d_Curve2d,
    theFirstParameter: Standard_Real,
    theLastParameter: Standard_Real,
    theAngularDeflection: Standard_Real,
    theCurvatureDeflection: Standard_Real,
    theMinimumOfPoints: Graphic3d_ZLayerId,
    theUTol: Standard_Real,
    theMinLen: Standard_Real
  ): void;
  AddPoint(
    thePnt: gp_Pnt,
    theParam: Standard_Real,
    theIsReplace: Standard_Boolean
  ): Graphic3d_ZLayerId;
  NbPoints(): Graphic3d_ZLayerId;
  Parameter(I: Graphic3d_ZLayerId): Standard_Real;
  Value(I: Graphic3d_ZLayerId): gp_Pnt;
  static ArcAngularStep(
    theRadius: Standard_Real,
    theLinearDeflection: Standard_Real,
    theAngularDeflection: Standard_Real,
    theMinLength: Standard_Real
  ): Standard_Real;
  delete(): void;
}

export declare class GCPnts_TangentialDeflection_1 extends GCPnts_TangentialDeflection {
  constructor();
}

export declare class GCPnts_TangentialDeflection_2 extends GCPnts_TangentialDeflection {
  constructor(
    theC: Adaptor3d_Curve,
    theAngularDeflection: Standard_Real,
    theCurvatureDeflection: Standard_Real,
    theMinimumOfPoints: Graphic3d_ZLayerId,
    theUTol: Standard_Real,
    theMinLen: Standard_Real
  );
}

export declare class GCPnts_TangentialDeflection_3 extends GCPnts_TangentialDeflection {
  constructor(
    theC: Adaptor3d_Curve,
    theFirstParameter: Standard_Real,
    theLastParameter: Standard_Real,
    theAngularDeflection: Standard_Real,
    theCurvatureDeflection: Standard_Real,
    theMinimumOfPoints: Graphic3d_ZLayerId,
    theUTol: Standard_Real,
    theMinLen: Standard_Real
  );
}

export declare class GCPnts_TangentialDeflection_4 extends GCPnts_TangentialDeflection {
  constructor(
    theC: Adaptor2d_Curve2d,
    theAngularDeflection: Standard_Real,
    theCurvatureDeflection: Standard_Real,
    theMinimumOfPoints: Graphic3d_ZLayerId,
    theUTol: Standard_Real,
    theMinLen: Standard_Real
  );
}

export declare class GCPnts_TangentialDeflection_5 extends GCPnts_TangentialDeflection {
  constructor(
    theC: Adaptor2d_Curve2d,
    theFirstParameter: Standard_Real,
    theLastParameter: Standard_Real,
    theAngularDeflection: Standard_Real,
    theCurvatureDeflection: Standard_Real,
    theMinimumOfPoints: Graphic3d_ZLayerId,
    theUTol: Standard_Real,
    theMinLen: Standard_Real
  );
}

export declare class BRepBuilderAPI_Command {
  IsDone(): Standard_Boolean;
  Check(): void;
  delete(): void;
}

export declare class BRepBuilderAPI_MakeSolid extends BRepBuilderAPI_MakeShape {
  Add(S: TopoDS_Shell): void;
  IsDone(): Standard_Boolean;
  Solid(): TopoDS_Solid;
  IsDeleted(S: TopoDS_Shape): Standard_Boolean;
  delete(): void;
}

export declare class BRepBuilderAPI_MakeSolid_1 extends BRepBuilderAPI_MakeSolid {
  constructor();
}

export declare class BRepBuilderAPI_MakeSolid_2 extends BRepBuilderAPI_MakeSolid {
  constructor(S: TopoDS_CompSolid);
}

export declare class BRepBuilderAPI_MakeSolid_3 extends BRepBuilderAPI_MakeSolid {
  constructor(S: TopoDS_Shell);
}

export declare class BRepBuilderAPI_MakeSolid_4 extends BRepBuilderAPI_MakeSolid {
  constructor(S1: TopoDS_Shell, S2: TopoDS_Shell);
}

export declare class BRepBuilderAPI_MakeSolid_5 extends BRepBuilderAPI_MakeSolid {
  constructor(S1: TopoDS_Shell, S2: TopoDS_Shell, S3: TopoDS_Shell);
}

export declare class BRepBuilderAPI_MakeSolid_6 extends BRepBuilderAPI_MakeSolid {
  constructor(So: TopoDS_Solid);
}

export declare class BRepBuilderAPI_MakeSolid_7 extends BRepBuilderAPI_MakeSolid {
  constructor(So: TopoDS_Solid, S: TopoDS_Shell);
}

export declare class BRepBuilderAPI_MakeShape extends BRepBuilderAPI_Command {
  Build(theRange: Message_ProgressRange): void;
  Shape(): TopoDS_Shape;
  Generated(S: TopoDS_Shape): TopTools_ListOfShape;
  Modified(S: TopoDS_Shape): TopTools_ListOfShape;
  IsDeleted(S: TopoDS_Shape): Standard_Boolean;
  delete(): void;
}

export declare class gp_Pnt {
  SetCoord_1(theIndex: Graphic3d_ZLayerId, theXi: Standard_Real): void;
  SetCoord_2(theXp: Standard_Real, theYp: Standard_Real, theZp: Standard_Real): void;
  SetX(theX: Standard_Real): void;
  SetY(theY: Standard_Real): void;
  SetZ(theZ: Standard_Real): void;
  SetXYZ(theCoord: gp_XYZ): void;
  Coord_1(theIndex: Graphic3d_ZLayerId): Standard_Real;
  Coord_2(theXp: Standard_Real, theYp: Standard_Real, theZp: Standard_Real): void;
  X(): Standard_Real;
  Y(): Standard_Real;
  Z(): Standard_Real;
  XYZ(): gp_XYZ;
  Coord_3(): gp_XYZ;
  ChangeCoord(): gp_XYZ;
  BaryCenter(theAlpha: Standard_Real, theP: gp_Pnt, theBeta: Standard_Real): void;
  IsEqual(theOther: gp_Pnt, theLinearTolerance: Standard_Real): Standard_Boolean;
  Distance(theOther: gp_Pnt): Standard_Real;
  SquareDistance(theOther: gp_Pnt): Standard_Real;
  Mirror_1(theP: gp_Pnt): void;
  Mirrored_1(theP: gp_Pnt): gp_Pnt;
  Mirror_2(theA1: gp_Ax1): void;
  Mirrored_2(theA1: gp_Ax1): gp_Pnt;
  Mirror_3(theA2: gp_Ax2): void;
  Mirrored_3(theA2: gp_Ax2): gp_Pnt;
  Rotate(theA1: gp_Ax1, theAng: Standard_Real): void;
  Rotated(theA1: gp_Ax1, theAng: Standard_Real): gp_Pnt;
  Scale(theP: gp_Pnt, theS: Standard_Real): void;
  Scaled(theP: gp_Pnt, theS: Standard_Real): gp_Pnt;
  Transform(theT: gp_Trsf): void;
  Transformed(theT: gp_Trsf): gp_Pnt;
  Translate_1(theV: gp_Vec): void;
  Translated_1(theV: gp_Vec): gp_Pnt;
  Translate_2(theP1: gp_Pnt, theP2: gp_Pnt): void;
  Translated_2(theP1: gp_Pnt, theP2: gp_Pnt): gp_Pnt;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  InitFromJson(theSStream: Standard_SStream, theStreamPos: Graphic3d_ZLayerId): Standard_Boolean;
  delete(): void;
}

export declare class gp_Pnt_1 extends gp_Pnt {
  constructor();
}

export declare class gp_Pnt_2 extends gp_Pnt {
  constructor(theCoord: gp_XYZ);
}

export declare class gp_Pnt_3 extends gp_Pnt {
  constructor(theXp: Standard_Real, theYp: Standard_Real, theZp: Standard_Real);
}

export declare class gp_Trsf {
  SetMirror_1(theP: gp_Pnt): void;
  SetMirror_2(theA1: gp_Ax1): void;
  SetMirror_3(theA2: gp_Ax2): void;
  SetRotation_1(theA1: gp_Ax1, theAng: Standard_Real): void;
  SetRotation_2(theR: gp_Quaternion): void;
  SetRotationPart(theR: gp_Quaternion): void;
  SetScale(theP: gp_Pnt, theS: Standard_Real): void;
  SetDisplacement(theFromSystem1: gp_Ax3, theToSystem2: gp_Ax3): void;
  SetTransformation_1(theFromSystem1: gp_Ax3, theToSystem2: gp_Ax3): void;
  SetTransformation_2(theToSystem: gp_Ax3): void;
  SetTransformation_3(R: gp_Quaternion, theT: gp_Vec): void;
  SetTranslation_1(theV: gp_Vec): void;
  SetTranslation_2(theP1: gp_Pnt, theP2: gp_Pnt): void;
  SetTranslationPart(theV: gp_Vec): void;
  SetScaleFactor(theS: Standard_Real): void;
  SetForm(theP: gp_TrsfForm): void;
  SetValues(
    a11: Standard_Real,
    a12: Standard_Real,
    a13: Standard_Real,
    a14: Standard_Real,
    a21: Standard_Real,
    a22: Standard_Real,
    a23: Standard_Real,
    a24: Standard_Real,
    a31: Standard_Real,
    a32: Standard_Real,
    a33: Standard_Real,
    a34: Standard_Real
  ): void;
  IsNegative(): Standard_Boolean;
  Form(): gp_TrsfForm;
  ScaleFactor(): Standard_Real;
  TranslationPart(): gp_XYZ;
  GetRotation_1(theAxis: gp_XYZ, theAngle: Standard_Real): Standard_Boolean;
  GetRotation_2(): gp_Quaternion;
  VectorialPart(): gp_Mat;
  HVectorialPart(): gp_Mat;
  Value(theRow: Graphic3d_ZLayerId, theCol: Graphic3d_ZLayerId): Standard_Real;
  Invert(): void;
  Inverted(): gp_Trsf;
  Multiplied(theT: gp_Trsf): gp_Trsf;
  Multiply(theT: gp_Trsf): void;
  PreMultiply(theT: gp_Trsf): void;
  Power(theN: Graphic3d_ZLayerId): void;
  Powered(theN: Graphic3d_ZLayerId): gp_Trsf;
  Transforms_1(theX: Standard_Real, theY: Standard_Real, theZ: Standard_Real): void;
  Transforms_2(theCoord: gp_XYZ): void;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  InitFromJson(theSStream: Standard_SStream, theStreamPos: Graphic3d_ZLayerId): Standard_Boolean;
  delete(): void;
}

export declare class gp_Trsf_1 extends gp_Trsf {
  constructor();
}

export declare class gp_Trsf_2 extends gp_Trsf {
  constructor(theT: gp_Trsf2d);
}

export declare class gp_Dir {
  SetCoord_1(theIndex: Graphic3d_ZLayerId, theXi: Standard_Real): void;
  SetCoord_2(theXv: Standard_Real, theYv: Standard_Real, theZv: Standard_Real): void;
  SetX(theX: Standard_Real): void;
  SetY(theY: Standard_Real): void;
  SetZ(theZ: Standard_Real): void;
  SetXYZ(theCoord: gp_XYZ): void;
  Coord_1(theIndex: Graphic3d_ZLayerId): Standard_Real;
  Coord_2(theXv: Standard_Real, theYv: Standard_Real, theZv: Standard_Real): void;
  X(): Standard_Real;
  Y(): Standard_Real;
  Z(): Standard_Real;
  XYZ(): gp_XYZ;
  IsEqual(theOther: gp_Dir, theAngularTolerance: Standard_Real): Standard_Boolean;
  IsNormal(theOther: gp_Dir, theAngularTolerance: Standard_Real): Standard_Boolean;
  IsOpposite(theOther: gp_Dir, theAngularTolerance: Standard_Real): Standard_Boolean;
  IsParallel(theOther: gp_Dir, theAngularTolerance: Standard_Real): Standard_Boolean;
  Angle(theOther: gp_Dir): Standard_Real;
  AngleWithRef(theOther: gp_Dir, theVRef: gp_Dir): Standard_Real;
  Cross(theRight: gp_Dir): void;
  Crossed(theRight: gp_Dir): gp_Dir;
  CrossCross(theV1: gp_Dir, theV2: gp_Dir): void;
  CrossCrossed(theV1: gp_Dir, theV2: gp_Dir): gp_Dir;
  Dot(theOther: gp_Dir): Standard_Real;
  DotCross(theV1: gp_Dir, theV2: gp_Dir): Standard_Real;
  Reverse(): void;
  Reversed(): gp_Dir;
  Mirror_1(theV: gp_Dir): void;
  Mirrored_1(theV: gp_Dir): gp_Dir;
  Mirror_2(theA1: gp_Ax1): void;
  Mirrored_2(theA1: gp_Ax1): gp_Dir;
  Mirror_3(theA2: gp_Ax2): void;
  Mirrored_3(theA2: gp_Ax2): gp_Dir;
  Rotate(theA1: gp_Ax1, theAng: Standard_Real): void;
  Rotated(theA1: gp_Ax1, theAng: Standard_Real): gp_Dir;
  Transform(theT: gp_Trsf): void;
  Transformed(theT: gp_Trsf): gp_Dir;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  InitFromJson(theSStream: Standard_SStream, theStreamPos: Graphic3d_ZLayerId): Standard_Boolean;
  delete(): void;
}

export declare class gp_Dir_1 extends gp_Dir {
  constructor();
}

export declare class gp_Dir_2 extends gp_Dir {
  constructor(theV: gp_Vec);
}

export declare class gp_Dir_3 extends gp_Dir {
  constructor(theCoord: gp_XYZ);
}

export declare class gp_Dir_4 extends gp_Dir {
  constructor(theXv: Standard_Real, theYv: Standard_Real, theZv: Standard_Real);
}

export declare class gp_Pnt2d {
  SetCoord_1(theIndex: Graphic3d_ZLayerId, theXi: Standard_Real): void;
  SetCoord_2(theXp: Standard_Real, theYp: Standard_Real): void;
  SetX(theX: Standard_Real): void;
  SetY(theY: Standard_Real): void;
  SetXY(theCoord: gp_XY): void;
  Coord_1(theIndex: Graphic3d_ZLayerId): Standard_Real;
  Coord_2(theXp: Standard_Real, theYp: Standard_Real): void;
  X(): Standard_Real;
  Y(): Standard_Real;
  XY(): gp_XY;
  Coord_3(): gp_XY;
  ChangeCoord(): gp_XY;
  IsEqual(theOther: gp_Pnt2d, theLinearTolerance: Standard_Real): Standard_Boolean;
  Distance(theOther: gp_Pnt2d): Standard_Real;
  SquareDistance(theOther: gp_Pnt2d): Standard_Real;
  Mirror_1(theP: gp_Pnt2d): void;
  Mirrored_1(theP: gp_Pnt2d): gp_Pnt2d;
  Mirror_2(theA: gp_Ax2d): void;
  Mirrored_2(theA: gp_Ax2d): gp_Pnt2d;
  Rotate(theP: gp_Pnt2d, theAng: Standard_Real): void;
  Rotated(theP: gp_Pnt2d, theAng: Standard_Real): gp_Pnt2d;
  Scale(theP: gp_Pnt2d, theS: Standard_Real): void;
  Scaled(theP: gp_Pnt2d, theS: Standard_Real): gp_Pnt2d;
  Transform(theT: gp_Trsf2d): void;
  Transformed(theT: gp_Trsf2d): gp_Pnt2d;
  Translate_1(theV: gp_Vec2d): void;
  Translated_1(theV: gp_Vec2d): gp_Pnt2d;
  Translate_2(theP1: gp_Pnt2d, theP2: gp_Pnt2d): void;
  Translated_2(theP1: gp_Pnt2d, theP2: gp_Pnt2d): gp_Pnt2d;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  delete(): void;
}

export declare class gp_Pnt2d_1 extends gp_Pnt2d {
  constructor();
}

export declare class gp_Pnt2d_2 extends gp_Pnt2d {
  constructor(theCoord: gp_XY);
}

export declare class gp_Pnt2d_3 extends gp_Pnt2d {
  constructor(theXp: Standard_Real, theYp: Standard_Real);
}

export declare class StlAPI_Reader {
  constructor();
  Read(theShape: TopoDS_Shape, theFileName: Standard_CString): Standard_Boolean;
  delete(): void;
}

export declare class XSControl_Reader {
  SetNorm(norm: Standard_CString): Standard_Boolean;
  SetWS(WS: Handle_XSControl_WorkSession, scratch: Standard_Boolean): void;
  WS(): Handle_XSControl_WorkSession;
  ReadFile(filename: Standard_CString): IFSelect_ReturnStatus;
  ReadStream(theName: Standard_CString, theIStream: Standard_IStream): IFSelect_ReturnStatus;
  Model(): Handle_Interface_InterfaceModel;
  GiveList_1(
    first: Standard_CString,
    second: Standard_CString
  ): Handle_TColStd_HSequenceOfTransient;
  GiveList_2(
    first: Standard_CString,
    ent: Handle_Standard_Transient
  ): Handle_TColStd_HSequenceOfTransient;
  NbRootsForTransfer(): Graphic3d_ZLayerId;
  RootForTransfer(num: Graphic3d_ZLayerId): Handle_Standard_Transient;
  TransferOneRoot(num: Graphic3d_ZLayerId, theProgress: Message_ProgressRange): Standard_Boolean;
  TransferOne(num: Graphic3d_ZLayerId, theProgress: Message_ProgressRange): Standard_Boolean;
  TransferEntity(
    start: Handle_Standard_Transient,
    theProgress: Message_ProgressRange
  ): Standard_Boolean;
  TransferList(
    list: Handle_TColStd_HSequenceOfTransient,
    theProgress: Message_ProgressRange
  ): Graphic3d_ZLayerId;
  TransferRoots(theProgress: Message_ProgressRange): Graphic3d_ZLayerId;
  ClearShapes(): void;
  NbShapes(): Graphic3d_ZLayerId;
  Shape(num: Graphic3d_ZLayerId): TopoDS_Shape;
  OneShape(): TopoDS_Shape;
  PrintCheckLoad_1(failsonly: Standard_Boolean, mode: IFSelect_PrintCount): void;
  PrintCheckLoad_2(
    theStream: Standard_OStream,
    failsonly: Standard_Boolean,
    mode: IFSelect_PrintCount
  ): void;
  PrintCheckTransfer_1(failsonly: Standard_Boolean, mode: IFSelect_PrintCount): void;
  PrintCheckTransfer_2(
    theStream: Standard_OStream,
    failsonly: Standard_Boolean,
    mode: IFSelect_PrintCount
  ): void;
  PrintStatsTransfer_1(what: Graphic3d_ZLayerId, mode: Graphic3d_ZLayerId): void;
  PrintStatsTransfer_2(
    theStream: Standard_OStream,
    what: Graphic3d_ZLayerId,
    mode: Graphic3d_ZLayerId
  ): void;
  GetStatsTransfer(
    list: Handle_TColStd_HSequenceOfTransient,
    nbMapped: Graphic3d_ZLayerId,
    nbWithResult: Graphic3d_ZLayerId,
    nbWithFail: Graphic3d_ZLayerId
  ): void;
  delete(): void;
}

export declare class XSControl_Reader_1 extends XSControl_Reader {
  constructor();
}

export declare class XSControl_Reader_2 extends XSControl_Reader {
  constructor(norm: Standard_CString);
}

export declare class XSControl_Reader_3 extends XSControl_Reader {
  constructor(WS: Handle_XSControl_WorkSession, scratch: Standard_Boolean);
}

export declare class BRepAdaptor_Curve extends Adaptor3d_Curve {
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  ShallowCopy(): Handle_Adaptor3d_Curve;
  Reset(): void;
  Initialize_1(E: TopoDS_Edge): void;
  Initialize_2(E: TopoDS_Edge, F: TopoDS_Face): void;
  Trsf(): gp_Trsf;
  Is3DCurve(): Standard_Boolean;
  IsCurveOnSurface(): Standard_Boolean;
  Curve(): GeomAdaptor_Curve;
  CurveOnSurface(): Adaptor3d_CurveOnSurface;
  Edge(): TopoDS_Edge;
  Tolerance(): Standard_Real;
  FirstParameter(): Standard_Real;
  LastParameter(): Standard_Real;
  Continuity(): GeomAbs_Shape;
  NbIntervals(S: GeomAbs_Shape): Graphic3d_ZLayerId;
  Intervals(T: IntTools_CArray1OfReal, S: GeomAbs_Shape): void;
  Trim(First: Standard_Real, Last: Standard_Real, Tol: Standard_Real): Handle_Adaptor3d_Curve;
  IsClosed(): Standard_Boolean;
  IsPeriodic(): Standard_Boolean;
  Period(): Standard_Real;
  Value(U: Standard_Real): gp_Pnt;
  D0(U: Standard_Real, P: gp_Pnt): void;
  D1(U: Standard_Real, P: gp_Pnt, V: gp_Vec): void;
  D2(U: Standard_Real, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec): void;
  D3(U: Standard_Real, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec, V3: gp_Vec): void;
  DN(U: Standard_Real, N: Graphic3d_ZLayerId): gp_Vec;
  Resolution(R3d: Standard_Real): Standard_Real;
  GetType(): GeomAbs_CurveType;
  Line(): gp_Lin;
  Circle(): gp_Circ;
  Ellipse(): gp_Elips;
  Hyperbola(): gp_Hypr;
  Parabola(): gp_Parab;
  Degree(): Graphic3d_ZLayerId;
  IsRational(): Standard_Boolean;
  NbPoles(): Graphic3d_ZLayerId;
  NbKnots(): Graphic3d_ZLayerId;
  Bezier(): Handle_Geom_BezierCurve;
  BSpline(): Handle_Geom_BSplineCurve;
  OffsetCurve(): Handle_Geom_OffsetCurve;
  delete(): void;
}

export declare class BRepAdaptor_Curve_1 extends BRepAdaptor_Curve {
  constructor();
}

export declare class BRepAdaptor_Curve_2 extends BRepAdaptor_Curve {
  constructor(E: TopoDS_Edge);
}

export declare class BRepAdaptor_Curve_3 extends BRepAdaptor_Curve {
  constructor(E: TopoDS_Edge, F: TopoDS_Face);
}

export declare class TopLoc_Location {
  IsIdentity(): Standard_Boolean;
  Identity(): void;
  FirstDatum(): Handle_TopLoc_Datum3D;
  FirstPower(): Graphic3d_ZLayerId;
  NextLocation(): TopLoc_Location;
  Transformation(): gp_Trsf;
  Inverted(): TopLoc_Location;
  Multiplied(Other: TopLoc_Location): TopLoc_Location;
  Divided(Other: TopLoc_Location): TopLoc_Location;
  Predivided(Other: TopLoc_Location): TopLoc_Location;
  Powered(pwr: Graphic3d_ZLayerId): TopLoc_Location;
  HashCode(theUpperBound: Graphic3d_ZLayerId): Graphic3d_ZLayerId;
  IsEqual(Other: TopLoc_Location): Standard_Boolean;
  IsDifferent(Other: TopLoc_Location): Standard_Boolean;
  DumpJson(theOStream: Standard_OStream, theDepth: Graphic3d_ZLayerId): void;
  ShallowDump(S: Standard_OStream): void;
  Clear(): void;
  static ScalePrec(): Standard_Real;
  delete(): void;
}

export declare class TopLoc_Location_1 extends TopLoc_Location {
  constructor();
}

export declare class TopLoc_Location_2 extends TopLoc_Location {
  constructor(T: gp_Trsf);
}

export declare class TopLoc_Location_3 extends TopLoc_Location {
  constructor(D: Handle_TopLoc_Datum3D);
}

export declare class STEPControl_Reader extends XSControl_Reader {
  StepModel(): Handle_StepData_StepModel;
  TransferRoot(num: Graphic3d_ZLayerId, theProgress: Message_ProgressRange): Standard_Boolean;
  NbRootsForTransfer(): Graphic3d_ZLayerId;
  FileUnits(
    theUnitLengthNames: TColStd_SequenceOfAsciiString,
    theUnitAngleNames: TColStd_SequenceOfAsciiString,
    theUnitSolidAngleNames: TColStd_SequenceOfAsciiString
  ): void;
  SetSystemLengthUnit(theLengthUnit: Standard_Real): void;
  SystemLengthUnit(): Standard_Real;
  delete(): void;
}

export declare class STEPControl_Reader_1 extends STEPControl_Reader {
  constructor();
}

export declare class STEPControl_Reader_2 extends STEPControl_Reader {
  constructor(WS: Handle_XSControl_WorkSession, scratch: Standard_Boolean);
}

export declare class GeomAdaptor_Curve extends Adaptor3d_Curve {
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  ShallowCopy(): Handle_Adaptor3d_Curve;
  Reset(): void;
  Load_1(theCurve: Handle_Geom_Curve): void;
  Load_2(theCurve: Handle_Geom_Curve, theUFirst: Standard_Real, theULast: Standard_Real): void;
  Curve(): Handle_Geom_Curve;
  FirstParameter(): Standard_Real;
  LastParameter(): Standard_Real;
  Continuity(): GeomAbs_Shape;
  NbIntervals(S: GeomAbs_Shape): Graphic3d_ZLayerId;
  Intervals(T: IntTools_CArray1OfReal, S: GeomAbs_Shape): void;
  Trim(First: Standard_Real, Last: Standard_Real, Tol: Standard_Real): Handle_Adaptor3d_Curve;
  IsClosed(): Standard_Boolean;
  IsPeriodic(): Standard_Boolean;
  Period(): Standard_Real;
  Value(U: Standard_Real): gp_Pnt;
  D0(U: Standard_Real, P: gp_Pnt): void;
  D1(U: Standard_Real, P: gp_Pnt, V: gp_Vec): void;
  D2(U: Standard_Real, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec): void;
  D3(U: Standard_Real, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec, V3: gp_Vec): void;
  DN(U: Standard_Real, N: Graphic3d_ZLayerId): gp_Vec;
  Resolution(R3d: Standard_Real): Standard_Real;
  GetType(): GeomAbs_CurveType;
  Line(): gp_Lin;
  Circle(): gp_Circ;
  Ellipse(): gp_Elips;
  Hyperbola(): gp_Hypr;
  Parabola(): gp_Parab;
  Degree(): Graphic3d_ZLayerId;
  IsRational(): Standard_Boolean;
  NbPoles(): Graphic3d_ZLayerId;
  NbKnots(): Graphic3d_ZLayerId;
  Bezier(): Handle_Geom_BezierCurve;
  BSpline(): Handle_Geom_BSplineCurve;
  OffsetCurve(): Handle_Geom_OffsetCurve;
  delete(): void;
}

export declare class GeomAdaptor_Curve_1 extends GeomAdaptor_Curve {
  constructor();
}

export declare class GeomAdaptor_Curve_2 extends GeomAdaptor_Curve {
  constructor(theCurve: Handle_Geom_Curve);
}

export declare class GeomAdaptor_Curve_3 extends GeomAdaptor_Curve {
  constructor(theCurve: Handle_Geom_Curve, theUFirst: Standard_Real, theULast: Standard_Real);
}

type Standard_Boolean = boolean;
type Standard_Byte = number;
type Standard_Character = number;
type Standard_CString = string;
type Standard_Integer = number;
type Standard_Real = number;
type Standard_ShortReal = number;
type Standard_Size = number;

declare namespace FS {
  interface Lookup {
    path: string;
    node: FSNode;
  }

  interface FSStream {}
  interface FSNode {}
  interface ErrnoError {}

  let ignorePermissions: boolean;
  let trackingDelegate: any;
  let tracking: any;
  let genericErrors: any;

  //
  // paths
  //
  function lookupPath(path: string, opts: any): Lookup;
  function getPath(node: FSNode): string;

  //
  // nodes
  //
  function isFile(mode: number): boolean;
  function isDir(mode: number): boolean;
  function isLink(mode: number): boolean;
  function isChrdev(mode: number): boolean;
  function isBlkdev(mode: number): boolean;
  function isFIFO(mode: number): boolean;
  function isSocket(mode: number): boolean;

  //
  // devices
  //
  function major(dev: number): number;
  function minor(dev: number): number;
  function makedev(ma: number, mi: number): number;
  function registerDevice(dev: number, ops: any): void;

  //
  // core
  //
  function syncfs(populate: boolean, callback: (e: any) => any): void;
  function syncfs(callback: (e: any) => any, populate?: boolean): void;
  function mount(type: any, opts: any, mountpoint: string): any;
  function unmount(mountpoint: string): void;

  function mkdir(path: string, mode?: number): any;
  function mkdev(path: string, mode?: number, dev?: number): any;
  function symlink(oldpath: string, newpath: string): any;
  function rename(old_path: string, new_path: string): void;
  function rmdir(path: string): void;
  function readdir(path: string): any;
  function unlink(path: string): void;
  function readlink(path: string): string;
  function stat(path: string, dontFollow?: boolean): any;
  function lstat(path: string): any;
  function chmod(path: string, mode: number, dontFollow?: boolean): void;
  function lchmod(path: string, mode: number): void;
  function fchmod(fd: number, mode: number): void;
  function chown(path: string, uid: number, gid: number, dontFollow?: boolean): void;
  function lchown(path: string, uid: number, gid: number): void;
  function fchown(fd: number, uid: number, gid: number): void;
  function truncate(path: string, len: number): void;
  function ftruncate(fd: number, len: number): void;
  function utime(path: string, atime: number, mtime: number): void;
  function open(
    path: string,
    flags: string,
    mode?: number,
    fd_start?: number,
    fd_end?: number
  ): FSStream;
  function close(stream: FSStream): void;
  function llseek(stream: FSStream, offset: number, whence: number): any;
  function read(
    stream: FSStream,
    buffer: ArrayBufferView,
    offset: number,
    length: number,
    position?: number
  ): number;
  function write(
    stream: FSStream,
    buffer: ArrayBufferView,
    offset: number,
    length: number,
    position?: number,
    canOwn?: boolean
  ): number;
  function allocate(stream: FSStream, offset: number, length: number): void;
  function mmap(
    stream: FSStream,
    buffer: ArrayBufferView,
    offset: number,
    length: number,
    position: number,
    prot: number,
    flags: number
  ): any;
  function ioctl(stream: FSStream, cmd: any, arg: any): any;
  function readFile(path: string, opts: { encoding: 'binary'; flags?: string }): Uint8Array;
  function readFile(path: string, opts: { encoding: 'utf8'; flags?: string }): string;
  function readFile(path: string, opts?: { flags?: string }): Uint8Array;
  function writeFile(path: string, data: string | ArrayBufferView, opts?: { flags?: string }): void;

  //
  // module-level FS code
  //
  function cwd(): string;
  function chdir(path: string): void;
  function init(
    input: null | (() => number | null),
    output: null | ((c: number) => any),
    error: null | ((c: number) => any)
  ): void;

  function createLazyFile(
    parent: string | FSNode,
    name: string,
    url: string,
    canRead: boolean,
    canWrite: boolean
  ): FSNode;
  function createPreloadedFile(
    parent: string | FSNode,
    name: string,
    url: string,
    canRead: boolean,
    canWrite: boolean,
    onload?: () => void,
    onerror?: () => void,
    dontCreateFile?: boolean,
    canOwn?: boolean
  ): void;
  function createDataFile(
    parent: string | FSNode,
    name: string,
    data: ArrayBufferView | string,
    canRead: boolean,
    canWrite: boolean,
    canOwn: boolean
  ): FSNode;
  interface AnalysisResults {
    isRoot: boolean;
    exists: boolean;
    error: Error;
    name: string;
    path: any;
    object: any;
    parentExists: boolean;
    parentPath: any;
    parentObject: any;
  }
  function analyzePath(path: string): AnalysisResults;
}

export type OpenCascadeInstance = { FS: typeof FS } & {
  TopExp_Explorer: typeof TopExp_Explorer;
  TopExp_Explorer_1: typeof TopExp_Explorer_1;
  TopExp_Explorer_2: typeof TopExp_Explorer_2;
  BRepBndLib: typeof BRepBndLib;
  Handle_Geom_Surface: typeof Handle_Geom_Surface;
  Handle_Geom_Surface_1: typeof Handle_Geom_Surface_1;
  Handle_Geom_Surface_2: typeof Handle_Geom_Surface_2;
  Handle_Geom_Surface_3: typeof Handle_Geom_Surface_3;
  Handle_Geom_Surface_4: typeof Handle_Geom_Surface_4;
  Geom_Surface: typeof Geom_Surface;
  Geom_Geometry: typeof Geom_Geometry;
  Handle_Geom_Curve: typeof Handle_Geom_Curve;
  Handle_Geom_Curve_1: typeof Handle_Geom_Curve_1;
  Handle_Geom_Curve_2: typeof Handle_Geom_Curve_2;
  Handle_Geom_Curve_3: typeof Handle_Geom_Curve_3;
  Handle_Geom_Curve_4: typeof Handle_Geom_Curve_4;
  Geom_Curve: typeof Geom_Curve;
  BRep_Builder: typeof BRep_Builder;
  BRep_Tool: typeof BRep_Tool;
  BRepMesh_IncrementalMesh: typeof BRepMesh_IncrementalMesh;
  BRepMesh_IncrementalMesh_1: typeof BRepMesh_IncrementalMesh_1;
  BRepMesh_IncrementalMesh_2: typeof BRepMesh_IncrementalMesh_2;
  BRepMesh_IncrementalMesh_3: typeof BRepMesh_IncrementalMesh_3;
  BRepMesh_DiscretRoot: typeof BRepMesh_DiscretRoot;
  Bnd_Box: typeof Bnd_Box;
  Bnd_Box_1: typeof Bnd_Box_1;
  Bnd_Box_2: typeof Bnd_Box_2;
  StdPrs_ToolTriangulatedShape: typeof StdPrs_ToolTriangulatedShape;
  IGESControl_Reader: typeof IGESControl_Reader;
  IGESControl_Reader_1: typeof IGESControl_Reader_1;
  IGESControl_Reader_2: typeof IGESControl_Reader_2;
  BRepTools: typeof BRepTools;
  Poly_Triangulation: typeof Poly_Triangulation;
  Poly_Triangulation_1: typeof Poly_Triangulation_1;
  Poly_Triangulation_2: typeof Poly_Triangulation_2;
  Poly_Triangulation_3: typeof Poly_Triangulation_3;
  Poly_Triangulation_4: typeof Poly_Triangulation_4;
  Poly_Triangulation_5: typeof Poly_Triangulation_5;
  Handle_Poly_Triangulation: typeof Handle_Poly_Triangulation;
  Handle_Poly_Triangulation_1: typeof Handle_Poly_Triangulation_1;
  Handle_Poly_Triangulation_2: typeof Handle_Poly_Triangulation_2;
  Handle_Poly_Triangulation_3: typeof Handle_Poly_Triangulation_3;
  Handle_Poly_Triangulation_4: typeof Handle_Poly_Triangulation_4;
  Poly_PolygonOnTriangulation: typeof Poly_PolygonOnTriangulation;
  Poly_PolygonOnTriangulation_1: typeof Poly_PolygonOnTriangulation_1;
  Poly_PolygonOnTriangulation_2: typeof Poly_PolygonOnTriangulation_2;
  Poly_PolygonOnTriangulation_3: typeof Poly_PolygonOnTriangulation_3;
  Handle_Poly_PolygonOnTriangulation: typeof Handle_Poly_PolygonOnTriangulation;
  Handle_Poly_PolygonOnTriangulation_1: typeof Handle_Poly_PolygonOnTriangulation_1;
  Handle_Poly_PolygonOnTriangulation_2: typeof Handle_Poly_PolygonOnTriangulation_2;
  Handle_Poly_PolygonOnTriangulation_3: typeof Handle_Poly_PolygonOnTriangulation_3;
  Handle_Poly_PolygonOnTriangulation_4: typeof Handle_Poly_PolygonOnTriangulation_4;
  Poly_Array1OfTriangle: typeof Poly_Array1OfTriangle;
  Poly_Array1OfTriangle_1: typeof Poly_Array1OfTriangle_1;
  Poly_Array1OfTriangle_2: typeof Poly_Array1OfTriangle_2;
  Poly_Array1OfTriangle_3: typeof Poly_Array1OfTriangle_3;
  Poly_Array1OfTriangle_4: typeof Poly_Array1OfTriangle_4;
  Poly_Array1OfTriangle_5: typeof Poly_Array1OfTriangle_5;
  Poly_Triangle: typeof Poly_Triangle;
  Poly_Triangle_1: typeof Poly_Triangle_1;
  Poly_Triangle_2: typeof Poly_Triangle_2;
  Poly_Connect: typeof Poly_Connect;
  Poly_Connect_1: typeof Poly_Connect_1;
  Poly_Connect_2: typeof Poly_Connect_2;
  TColgp_Array1OfDir: typeof TColgp_Array1OfDir;
  TColgp_Array1OfDir_1: typeof TColgp_Array1OfDir_1;
  TColgp_Array1OfDir_2: typeof TColgp_Array1OfDir_2;
  TColgp_Array1OfDir_3: typeof TColgp_Array1OfDir_3;
  TColgp_Array1OfDir_4: typeof TColgp_Array1OfDir_4;
  TColgp_Array1OfDir_5: typeof TColgp_Array1OfDir_5;
  TColgp_Array1OfPnt: typeof TColgp_Array1OfPnt;
  TColgp_Array1OfPnt_1: typeof TColgp_Array1OfPnt_1;
  TColgp_Array1OfPnt_2: typeof TColgp_Array1OfPnt_2;
  TColgp_Array1OfPnt_3: typeof TColgp_Array1OfPnt_3;
  TColgp_Array1OfPnt_4: typeof TColgp_Array1OfPnt_4;
  TColgp_Array1OfPnt_5: typeof TColgp_Array1OfPnt_5;
  TColgp_Array1OfPnt2d: typeof TColgp_Array1OfPnt2d;
  TColgp_Array1OfPnt2d_1: typeof TColgp_Array1OfPnt2d_1;
  TColgp_Array1OfPnt2d_2: typeof TColgp_Array1OfPnt2d_2;
  TColgp_Array1OfPnt2d_3: typeof TColgp_Array1OfPnt2d_3;
  TColgp_Array1OfPnt2d_4: typeof TColgp_Array1OfPnt2d_4;
  TColgp_Array1OfPnt2d_5: typeof TColgp_Array1OfPnt2d_5;
  TopAbs_Orientation: TopAbs_Orientation;
  TopAbs_ShapeEnum: TopAbs_ShapeEnum;
  TopoDS_Solid: typeof TopoDS_Solid;
  TopoDS_Shell: typeof TopoDS_Shell;
  TopoDS: typeof TopoDS;
  TopoDS_Edge: typeof TopoDS_Edge;
  TopoDS_HShape: typeof TopoDS_HShape;
  TopoDS_HShape_1: typeof TopoDS_HShape_1;
  TopoDS_HShape_2: typeof TopoDS_HShape_2;
  TopoDS_Vertex: typeof TopoDS_Vertex;
  TopoDS_Shape: typeof TopoDS_Shape;
  TopoDS_Builder: typeof TopoDS_Builder;
  TopoDS_Face: typeof TopoDS_Face;
  TopoDS_Compound: typeof TopoDS_Compound;
  BRepGProp: typeof BRepGProp;
  Standard_Transient: typeof Standard_Transient;
  Standard_Transient_1: typeof Standard_Transient_1;
  Standard_Transient_2: typeof Standard_Transient_2;
  GProp_GProps: typeof GProp_GProps;
  GProp_GProps_1: typeof GProp_GProps_1;
  GProp_GProps_2: typeof GProp_GProps_2;
  TColStd_Array1OfInteger: typeof TColStd_Array1OfInteger;
  TColStd_Array1OfInteger_1: typeof TColStd_Array1OfInteger_1;
  TColStd_Array1OfInteger_2: typeof TColStd_Array1OfInteger_2;
  TColStd_Array1OfInteger_3: typeof TColStd_Array1OfInteger_3;
  TColStd_Array1OfInteger_4: typeof TColStd_Array1OfInteger_4;
  TColStd_Array1OfInteger_5: typeof TColStd_Array1OfInteger_5;
  Adaptor3d_Curve: typeof Adaptor3d_Curve;
  IFSelect_ReturnStatus: IFSelect_ReturnStatus;
  Message_ProgressRange: typeof Message_ProgressRange;
  Message_ProgressRange_1: typeof Message_ProgressRange_1;
  Message_ProgressRange_2: typeof Message_ProgressRange_2;
  GCPnts_TangentialDeflection: typeof GCPnts_TangentialDeflection;
  GCPnts_TangentialDeflection_1: typeof GCPnts_TangentialDeflection_1;
  GCPnts_TangentialDeflection_2: typeof GCPnts_TangentialDeflection_2;
  GCPnts_TangentialDeflection_3: typeof GCPnts_TangentialDeflection_3;
  GCPnts_TangentialDeflection_4: typeof GCPnts_TangentialDeflection_4;
  GCPnts_TangentialDeflection_5: typeof GCPnts_TangentialDeflection_5;
  BRepBuilderAPI_Command: typeof BRepBuilderAPI_Command;
  BRepBuilderAPI_MakeSolid: typeof BRepBuilderAPI_MakeSolid;
  BRepBuilderAPI_MakeSolid_1: typeof BRepBuilderAPI_MakeSolid_1;
  BRepBuilderAPI_MakeSolid_2: typeof BRepBuilderAPI_MakeSolid_2;
  BRepBuilderAPI_MakeSolid_3: typeof BRepBuilderAPI_MakeSolid_3;
  BRepBuilderAPI_MakeSolid_4: typeof BRepBuilderAPI_MakeSolid_4;
  BRepBuilderAPI_MakeSolid_5: typeof BRepBuilderAPI_MakeSolid_5;
  BRepBuilderAPI_MakeSolid_6: typeof BRepBuilderAPI_MakeSolid_6;
  BRepBuilderAPI_MakeSolid_7: typeof BRepBuilderAPI_MakeSolid_7;
  BRepBuilderAPI_MakeShape: typeof BRepBuilderAPI_MakeShape;
  gp_Pnt: typeof gp_Pnt;
  gp_Pnt_1: typeof gp_Pnt_1;
  gp_Pnt_2: typeof gp_Pnt_2;
  gp_Pnt_3: typeof gp_Pnt_3;
  gp_Trsf: typeof gp_Trsf;
  gp_Trsf_1: typeof gp_Trsf_1;
  gp_Trsf_2: typeof gp_Trsf_2;
  gp_Dir: typeof gp_Dir;
  gp_Dir_1: typeof gp_Dir_1;
  gp_Dir_2: typeof gp_Dir_2;
  gp_Dir_3: typeof gp_Dir_3;
  gp_Dir_4: typeof gp_Dir_4;
  gp_Pnt2d: typeof gp_Pnt2d;
  gp_Pnt2d_1: typeof gp_Pnt2d_1;
  gp_Pnt2d_2: typeof gp_Pnt2d_2;
  gp_Pnt2d_3: typeof gp_Pnt2d_3;
  StlAPI_Reader: typeof StlAPI_Reader;
  XSControl_Reader: typeof XSControl_Reader;
  XSControl_Reader_1: typeof XSControl_Reader_1;
  XSControl_Reader_2: typeof XSControl_Reader_2;
  XSControl_Reader_3: typeof XSControl_Reader_3;
  BRepAdaptor_Curve: typeof BRepAdaptor_Curve;
  BRepAdaptor_Curve_1: typeof BRepAdaptor_Curve_1;
  BRepAdaptor_Curve_2: typeof BRepAdaptor_Curve_2;
  BRepAdaptor_Curve_3: typeof BRepAdaptor_Curve_3;
  TopLoc_Location: typeof TopLoc_Location;
  TopLoc_Location_1: typeof TopLoc_Location_1;
  TopLoc_Location_2: typeof TopLoc_Location_2;
  TopLoc_Location_3: typeof TopLoc_Location_3;
  STEPControl_Reader: typeof STEPControl_Reader;
  STEPControl_Reader_1: typeof STEPControl_Reader_1;
  STEPControl_Reader_2: typeof STEPControl_Reader_2;
  GeomAdaptor_Curve: typeof GeomAdaptor_Curve;
  GeomAdaptor_Curve_1: typeof GeomAdaptor_Curve_1;
  GeomAdaptor_Curve_2: typeof GeomAdaptor_Curve_2;
  GeomAdaptor_Curve_3: typeof GeomAdaptor_Curve_3;
};

declare function init(): Promise<OpenCascadeInstance>;

export default init;
