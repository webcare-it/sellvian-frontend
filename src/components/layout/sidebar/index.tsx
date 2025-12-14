import { useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getImageUrl, slugify } from "@/helper";
import { useCategories } from "@/api/queries/useCategories";
import { Skeleton } from "@/components/common/skeleton";
import { Placeholder } from "@/components/common/placeholder";

export type CategoryType = {
  id: number;
  name: string;
  banner: string;
  icon: string;
  number_of_children: number;
  links: {
    products: string;
    sub_categories: string;
  };
  sub_categories: SubCategoryType[];
};

export type SubCategoryType = {
  id: number;
  name: string;
  banner: string;
  icon: string;
  number_of_children: number;
  links: {
    products: string;
  };
  sub_sub_categories: SubSubCategoryType[];
};

export type SubSubCategoryType = {
  id: number;
  name: string;
  banner: string;
  icon: string;
  number_of_children: number;
  links: {
    products: string;
  };
};

export interface MenuItemType {
  name: string;
  href: string;
  submenu?: {
    columns: {
      href: string;
      title: string;
      links: { name: string; href: string; highlight?: boolean }[];
    }[];
    promos?: {
      image: string;
      title: string;
      link: string;
    }[];
  };
}

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location?.pathname;

  const { data, isLoading } = useCategories();
  const categories = data?.data as CategoryType[];

  const pathSegments = useMemo(
    () => pathname?.split("/").filter(Boolean) || [],
    [pathname]
  );

  const { currentCategory, currentSubCategory, currentView } = useMemo(() => {
    if (
      !categories ||
      pathSegments?.[0] !== "categories" ||
      pathSegments?.length < 3
    ) {
      return {
        currentCategory: null,
        currentSubCategory: null,
        currentView: "main" as const,
      };
    }

    const categoryId = parseInt(pathSegments?.[1] || "0");
    const category = categories?.find((cat) => cat?.id === categoryId);

    if (!category) {
      return {
        currentCategory: null,
        currentSubCategory: null,
        currentView: "main" as const,
      };
    }

    if (pathSegments?.length >= 5) {
      const subCategoryId = parseInt(pathSegments?.[3] || "0");
      const subCategory = category?.sub_categories?.find(
        (sub) => sub?.id === subCategoryId
      );

      if (subCategory) {
        const view =
          pathSegments?.length >= 7 ||
          (subCategory?.sub_sub_categories &&
            subCategory?.sub_sub_categories?.length > 0)
            ? "subsub"
            : "sub";
        return {
          currentCategory: category,
          currentSubCategory: subCategory,
          currentView: view,
        };
      }
      return {
        currentCategory: category,
        currentSubCategory: null,
        currentView: "sub" as const,
      };
    }

    const view =
      category?.sub_categories && category?.sub_categories?.length > 0
        ? "sub"
        : "main";
    return {
      currentCategory: category,
      currentSubCategory: null,
      currentView: view,
    };
  }, [categories, pathSegments]);

  const handleMainCategoryClick = useCallback(
    (category: CategoryType) => {
      sessionStorage.setItem("previousPage", pathname);
      navigate(`/categories/${category?.id}/${slugify(category?.name)}`);
    },
    [navigate, pathname]
  );

  const handleSubCategoryClick = useCallback(
    (subCategory: SubCategoryType) => {
      if (!currentCategory) return;
      navigate(
        `/categories/${currentCategory?.id}/${slugify(currentCategory?.name)}/${
          subCategory?.id
        }/${slugify(subCategory?.name)}`
      );
    },
    [navigate, currentCategory]
  );

  const handleSubSubCategoryClick = useCallback(
    (subSubCategory: SubSubCategoryType) => {
      if (!currentCategory || !currentSubCategory) return;
      navigate(
        `/categories/${currentCategory?.id}/${slugify(currentCategory?.name)}/${
          currentSubCategory?.id
        }/${slugify(currentSubCategory?.name)}/${subSubCategory?.id}/${slugify(
          subSubCategory?.name
        )}`
      );
    },
    [navigate, currentCategory, currentSubCategory]
  );

  const goBack = useCallback(() => {
    if (pathSegments?.length >= 7) {
      const [
        categories,
        categoryId,
        categoryName,
        subCategoryId,
        subCategoryName,
      ] = pathSegments;
      const targetUrl = `/${categories}/${categoryId}/${categoryName}/${subCategoryId}/${subCategoryName}`;
      navigate(targetUrl);
    } else if (pathSegments?.length >= 5) {
      const [categories, categoryId, categoryName] = pathSegments;
      const targetUrl = `/${categories}/${categoryId}/${categoryName}`;
      navigate(targetUrl);
    } else if (pathSegments?.length >= 3) {
      const previousPage = sessionStorage.getItem("previousPage") || "/";
      sessionStorage.removeItem("previousPage");
      navigate(previousPage);
    }
  }, [navigate, pathSegments]);

  const AllProducts = useCallback(() => {
    const handleClick = () => {
      navigate("/products");
    };
    return (
      <button
        onClick={handleClick}
        className={`flex flex-col items-center p-4 cursor-pointer transition-all duration-200 hover:bg-primary/5 ${
          pathname === "/products" ? "bg-primary/5" : ""
        }`}>
        <img
          src={"/all-product.png"}
          alt={"All Products"}
          className="w-10 h-10 object-contain mb-2 overflow-hidden"
        />
        <span className="text-sm font-medium text-foreground text-center line-clamp-2">
          All Products
        </span>
      </button>
    );
  }, [navigate, pathname]);

  const CategoryItem = useCallback(
    ({ category }: { category: CategoryType }) => {
      const isActive =
        pathname === `/categories/${category?.id}/${slugify(category?.name)}`;
      return (
        <div
          key={category?.id}
          className={`flex flex-col items-center p-4 cursor-pointer transition-all duration-200 hover:bg-primary/5 ${
            isActive ? "bg-primary/5" : ""
          }`}
          onClick={() => handleMainCategoryClick(category)}>
          {category?.icon ? (
            <img
              src={getImageUrl(category?.icon)}
              alt={category?.name}
              className="w-10 h-10 object-contain mb-2 overflow-hidden"
            />
          ) : (
            <Placeholder className="w-10 h-10" />
          )}

          <span className="text-sm font-medium text-foreground text-center line-clamp-2">
            {category?.name}
          </span>
        </div>
      );
    },
    [pathname, handleMainCategoryClick]
  );

  const SubCategoryItem = useCallback(
    ({ subCategory }: { subCategory: SubCategoryType }) => {
      if (!currentCategory) return null;
      const isActive =
        pathname ===
        `/categories/${currentCategory?.id}/${slugify(currentCategory?.name)}/${
          subCategory?.id
        }/${slugify(subCategory?.name)}`;
      return (
        <div
          key={subCategory?.id}
          className={`flex items-center justify-between p-3 cursor-pointer transition-all duration-200 hover:bg-primary/5 ${
            isActive ? "bg-primary/5" : ""
          }`}
          onClick={() => handleSubCategoryClick(subCategory)}>
          <div className="flex items-center gap-2">
            {subCategory?.icon ? (
              <img
                src={getImageUrl(subCategory?.icon)}
                alt={subCategory?.name}
                className="w-8 h-8 object-contain flex-shrink-0 overflow-hidden"
              />
            ) : (
              <Placeholder className="w-8 h-8" />
            )}

            <span className="text-sm font-medium text-foreground line-clamp-1 text-ellipsis">
              {subCategory?.name}
            </span>
          </div>
        </div>
      );
    },
    [pathname, currentCategory, handleSubCategoryClick]
  );

  const SubSubCategoryItem = useCallback(
    ({ subSubCategory }: { subSubCategory: SubSubCategoryType }) => {
      if (!currentCategory || !currentSubCategory) return null;
      const isActive =
        pathname ===
        `/categories/${currentCategory?.id}/${slugify(currentCategory?.name)}/${
          currentSubCategory?.id
        }/${slugify(currentSubCategory?.name)}/${subSubCategory?.id}/${slugify(
          subSubCategory?.name
        )}`;
      return (
        <div
          key={subSubCategory?.id}
          className={`flex items-center justify-between p-3 cursor-pointer transition-all duration-200 hover:bg-primary/5 ${
            isActive ? "bg-primary/5" : ""
          }`}
          onClick={() => handleSubSubCategoryClick(subSubCategory)}>
          <div className="flex items-center gap-2">
            {subSubCategory?.icon ? (
              <img
                src={getImageUrl(subSubCategory?.icon)}
                alt={subSubCategory?.name}
                className="w-8 h-8 object-contain flex-shrink-0 overflow-hidden"
              />
            ) : (
              <Placeholder className="w-8 h-8" />
            )}

            <span className="text-sm font-medium text-foreground line-clamp-1 text-ellipsis">
              {subSubCategory?.name}
            </span>
          </div>
        </div>
      );
    },
    [pathname, currentCategory, currentSubCategory, handleSubSubCategoryClick]
  );

  const HeaderComponent = useMemo(() => {
    if (currentView === "main") return null;
    return (
      <div className="p-4 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <button
            onClick={goBack}
            className="flex items-center justify-center cursor-pointer w-8 h-8 rounded-full hover:bg-primary/5 transition-colors">
            <ArrowLeft className="w-4 h-4 text-primary" />
          </button>
          <h3 className="text-sm font-medium text-primary line-clamp-1">
            {currentView === "sub"
              ? currentCategory?.name
              : currentSubCategory?.name}
          </h3>
        </div>
      </div>
    );
  }, [currentView, currentCategory, currentSubCategory, goBack]);

  return (
    <div className="w-full h-full flex flex-col">
      {isLoading ? (
        <div className="grid grid-cols-2 gap-1">
          {Array.from({ length: 16 }, (_, index) => (
            <Skeleton key={index} className="col-span-1 h-28 rounded-none" />
          ))}
        </div>
      ) : (
        <>
          {HeaderComponent}
          <div className="flex-1 overflow-y-auto scrollbar-thin overflow-x-hidden scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-hide">
            <div>
              {currentView === "main" && (
                <div className="grid grid-cols-2">
                  <AllProducts />
                  {categories?.map((category) => (
                    <CategoryItem key={category?.id} category={category} />
                  ))}
                </div>
              )}

              {currentView === "sub" && currentCategory?.sub_categories && (
                <div className="space-y-1">
                  {currentCategory?.sub_categories?.map((subCategory) => (
                    <SubCategoryItem
                      key={subCategory?.id}
                      subCategory={subCategory}
                    />
                  ))}
                </div>
              )}

              {currentView === "subsub" &&
                currentSubCategory?.sub_sub_categories && (
                  <div className="space-y-1">
                    {currentSubCategory?.sub_sub_categories?.map(
                      (subSubCategory) => (
                        <SubSubCategoryItem
                          key={subSubCategory?.id}
                          subSubCategory={subSubCategory}
                        />
                      )
                    )}
                  </div>
                )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
